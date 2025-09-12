package com.csu.csu_backend.runner;

import com.csu.csu_backend.entity.Category;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.repository.CategoryRepository;
import com.csu.csu_backend.repository.UserRepository;
import com.csu.csu_backend.entity.*;
import com.csu.csu_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.time.LocalDateTime;
import java.util.*;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final GroupRepository groupRepository;
    private final MembershipRepository membershipRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final EventRepository eventRepository;
    private final EventAttendeeRepository eventAttendeeRepository;
    private final PasswordEncoder passwordEncoder;

    private final Random random = new Random();

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // 데이터가 이미 있는 경우 중복 실행 방지
        // --- 1. 유저 10명 생성 ---
        if (userRepository.count() == 0) {
            // 1. 테스트용 사용자 데이터 생성 (비밀번호 암호화)
            User owner = new User("owner@test.com", passwordEncoder.encode("password123"), "그룹장");
            User member = new User("member@test.com", passwordEncoder.encode("password123"), "일반멤버");

            userRepository.save(owner);
            userRepository.save(member);
            System.out.println("테스트 사용자 데이터 생성 완료.");
            List<User> users = new ArrayList<>();
            for (int i = 1; i <= 6; i++) {
                User user = new User(
                        "user" + i + "@test.com",
                        passwordEncoder.encode("password123"),
                        "유저" + i
                );
                users.add(user);
            }
            userRepository.saveAll(users);
            System.out.println("유저 10명 생성 완료.");
        }

        // --- 2. 카테고리 생성 ---
        if (categoryRepository.count() == 0) {
            // 2. 고정 카테고리 8개 생성
            List<Category> categories = List.of(
                    new Category("운동/스포츠"),
                    new Category("스터디/개발"),
                    new Category("여행/캠핑"),
                    new Category("문화/예술"),
                    new Category("음식/요리"),
                    new Category("게임/오락"),
                    new Category("반려동물"),
                    new Category("기타")
            );

            categoryRepository.saveAll(categories);
            System.out.println("고정 카테고리 8개 생성 완료.");
        }

        List<User> allUsers = userRepository.findAll();
        List<Category> allCategories = categoryRepository.findAll();

        // --- 3. 그룹 10개 생성 ---
        if (groupRepository.count() == 0) {
            for (int i = 1; i <= 30; i++) {
                User owner = allUsers.get(random.nextInt(allUsers.size()));
                Category category = allCategories.get(random.nextInt(allCategories.size()));

                Group group = Group.builder()
                        .name("그룹 " + i)
                        .description("이것은 그룹 " + i + "의 설명입니다.")
                        .region("서울")
                        .maxMembers(20)
                        .imageUrl("https://placehold.co/300x200?text=Group" + i)
                        .tags("태그" + i)
                        .owner(owner)
                        .category(category)
                        .build();
                groupRepository.save(group);

                // --- 그룹장 멤버십 ---
                membershipRepository.save(Membership.builder()
                        .user(owner)
                        .group(group)
                        .role("OWNER")
                        .build());

                // --- 다른 유저도 몇 명 랜덤 멤버로 참여 ---
                for (int j = 0; j < 3; j++) {
                    User member = allUsers.get(random.nextInt(allUsers.size()));
                    if (!membershipRepository.existsByUserAndGroup(member, group)) {
                        membershipRepository.save(Membership.builder()
                                .user(member)
                                .group(group)
                                .role("MEMBER")
                                .build());
                    }
                }

                // --- 4. 게시글 6개 생성 ---
                for (int p = 1; p <= 6; p++) {
                    User writer = allUsers.get(random.nextInt(allUsers.size()));
                    Post post = Post.builder()
                            .title("그룹 " + i + "의 게시글 " + p)
                            .content("이것은 그룹 " + i + "의 게시글 " + p + " 내용입니다.")
                            .user(writer)
                            .group(group)
                            .build();
                    postRepository.save(post);

                    // --- 댓글 2개 생성 ---
                    for (int c = 1; c <= 2; c++) {
                        User commenter = allUsers.get(random.nextInt(allUsers.size()));
                        Comment comment = Comment.builder()
                                .content("댓글 " + c + " (게시글 " + p + ")")
                                .user(commenter)
                                .post(post)
                                .build();
                        commentRepository.save(comment);
                    }
                }

                // --- 5. 이벤트 5개 생성 ---
                for (int e = 1; e <= 5; e++) {
                    LocalDateTime start = LocalDateTime.now()
                            .plusDays(e);
                    Event event = Event.builder()
                            .title("그룹 " + i + " 이벤트 " + e)
                            .description("이것은 그룹 " + i + "의 이벤트 " + e + " 설명입니다.")
                            .maxAttendees(20)
                            .startAt(start)
                            .endAt(start.plusHours(2))
                            .host(owner)
                            .group(group)
                            .build();
                    eventRepository.save(event);

                    // --- 참석자 3명 (host + 2명) ---
                    Set<Long> addedUserIds = new HashSet<>();

                    // 1. host 등록
                    eventAttendeeRepository.save(EventAttendee.builder()
                            .event(event)
                            .user(owner)
                            .role("HOST")
                            .status("APPROVED")
                            .build());
                    addedUserIds.add(owner.getId());

                    // 2. 랜덤 유저 2명 추가 (중복 방지)
                    for (int a = 0; a < 2; a++) {
                        User attendee;
                        do {
                            attendee = allUsers.get(random.nextInt(allUsers.size()));
                        } while (addedUserIds.contains(attendee.getId())); // 이미 추가된 유저는 제외
                        addedUserIds.add(attendee.getId());

                        eventAttendeeRepository.save(EventAttendee.builder()
                                .event(event)
                                .user(attendee)
                                .role("MEMBER")
                                .status("APPROVED")
                                .build());
                    }
                }
            }
            System.out.println("그룹 10개 + 게시글/댓글/이벤트 데이터 생성 완료.");
        }
    }
}
