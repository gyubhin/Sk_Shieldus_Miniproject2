package com.csu.csu_backend.runner;

import com.csu.csu_backend.entity.*;
import com.csu.csu_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

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
        // --- 1. 유저 생성 ---
        if (userRepository.count() == 0) {
            System.out.println(">>> User 데이터 생성을 시작합니다...");
            User owner = new User("test1@test.com", passwordEncoder.encode("test1234"), "그룹장");
            User member = new User("member@test.com", passwordEncoder.encode("password123"), "일반멤버");
            userRepository.save(owner);
            userRepository.save(member);
            List<User> users = new ArrayList<>();
            for (int i = 1; i <= 6; i++) {
                User user = new User("user" + i + "@test.com", passwordEncoder.encode("password123"), "유저" + i);
                users.add(user);
            }
            userRepository.saveAll(users);
            System.out.println("<<< 유저 데이터 생성 완료.");
        }

        // --- 2. 카테고리 생성 ---
        if (categoryRepository.count() == 0) {
            System.out.println(">>> Category 데이터 생성을 시작합니다...");
            List<Category> categories = List.of(
                    new Category("운동/스포츠"), new Category("스터디/개발"), new Category("여행/캠핑"),
                    new Category("문화/예술"), new Category("음식/요리"), new Category("게임/오락"),
                    new Category("반려동물"), new Category("기타")
            );
            categoryRepository.saveAll(categories);
            System.out.println("<<< 카테고리 데이터 생성 완료.");
        }

        // --- 3. 그룹 및 연관 데이터 생성 ---
        if (groupRepository.count() == 0) {
            System.out.println(">>> Group 및 연관 데이터 생성을 시작합니다...");
            List<User> allUsers = userRepository.findAll();
            List<Category> allCategories = categoryRepository.findAll();

            // ▼▼▼ 중요: 그룹 생성 로직 안에서 특정 유저를 찾도록 위치 변경 ▼▼▼
            User owner = userRepository.findByEmail("test1@test.com")
                    .orElseThrow(() -> new RuntimeException("DataInitializer: 'test1@test.com' 유저를 찾을 수 없습니다. 유저 생성 로직을 확인하세요."));

            for (int i = 1; i <= 30; i++) {
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

                membershipRepository.save(Membership.builder().user(owner).group(group).role("OWNER").build());

                for (int j = 0; j < 3; j++) {
                    User randomMember = allUsers.get(random.nextInt(allUsers.size()));
                    if (!membershipRepository.existsByUserAndGroup(randomMember, group)) {
                        membershipRepository.save(Membership.builder().user(randomMember).group(group).role("MEMBER").build());
                    }
                }

                for (int p = 1; p <= 6; p++) {
                    Post post = Post.builder()
                            .title("그룹 " + i + "의 게시글 " + p)
                            .content("이것은 그룹 " + i + "의 게시글 " + p + " 내용입니다.")
                            .user(allUsers.get(random.nextInt(allUsers.size())))
                            .group(group)
                            .build();
                    postRepository.save(post);

                    for (int c = 1; c <= 2; c++) {
                        commentRepository.save(Comment.builder()
                                .content("댓글 " + c + " (게시글 " + p + ")")
                                .user(allUsers.get(random.nextInt(allUsers.size())))
                                .post(post)
                                .build());
                    }
                }

                for (int e = 1; e <= 5; e++) {
                    LocalDateTime start = LocalDateTime.now().plusDays(e);
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

                    Set<Long> addedUserIds = new HashSet<>();
                    eventAttendeeRepository.save(EventAttendee.builder().event(event).user(owner).role("HOST").status("CONFIRMED").build());
                    addedUserIds.add(owner.getId());

                    for (int a = 0; a < 2; a++) {
                        User attendee;
                        do {
                            attendee = allUsers.get(random.nextInt(allUsers.size()));
                        } while (addedUserIds.contains(attendee.getId()));
                        addedUserIds.add(attendee.getId());
                        eventAttendeeRepository.save(EventAttendee.builder().event(event).user(attendee).role("ATTENDEE").status("CONFIRMED").build());
                    }
                }
            }
            System.out.println("<<< 그룹 30개 + 게시글/댓글/이벤트 데이터 생성 완료.");
        }
    }
}