package com.csu.csu_backend.runner;

import com.csu.csu_backend.dto.EventRequest;
import com.csu.csu_backend.entity.Category;
import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.repository.CategoryRepository;
import com.csu.csu_backend.repository.GroupRepository;
import com.csu.csu_backend.repository.UserRepository;
import com.csu.csu_backend.service.EventService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final GroupRepository groupRepository;
    private final EventService eventService;

    // Lombok 대신 수동으로 의존성 주입
    public DataInitializer(UserRepository userRepository, CategoryRepository categoryRepository, GroupRepository groupRepository, EventService eventService) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.groupRepository = groupRepository;
        this.eventService = eventService;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            System.out.println("초기 데이터가 이미 존재하므로, 생성을 건너뜁니다.");
            return;
        }

        // 1. 테스트용 사용자 데이터 생성 (복원된 User 엔티티 구조에 맞게)
        User owner = new User("owner@test.com", "password123", "그룹장");
        userRepository.save(owner);
        System.out.println("테스트 사용자(그룹장) 데이터 생성 완료.");

        // 2. 테스트용 카테고리 데이터 생성 (확인된 Category 엔티티 구조에 맞게)
        Category sports = new Category("운동");
        categoryRepository.save(sports);
        System.out.println("테스트 카테고리(운동) 데이터 생성 완료.");

        // 3. 테스트용 그룹 데이터 생성 (확인된 Group 엔티티의 Builder 패턴 사용)
        Group group = Group.builder()
                .name("저녁 풋살 하실 분!")
                .description("매주 평일 저녁에 같이 풋살할 멤버를 구합니다.")
                .region("판교")
                .maxMembers(20)
                .owner(owner)
                .category(sports)
                .build();
        groupRepository.save(group);
        System.out.println("테스트 그룹(저녁 풋살 하실 분!) 데이터 생성 완료.");

        // 4. 테스트용 이벤트 데이터 생성 (EventService 호출)
        EventRequest eventRequest = new EventRequest();
        eventRequest.setTitle("6월 30일 저녁 7시 풋살 정모");
        eventRequest.setDescription("이번 주 정모는 판교 스타디움에서 진행합니다. 회비는 1만원입니다.");
        eventRequest.setEventDate(LocalDateTime.of(2024, 6, 30, 19, 0, 0));
        eventRequest.setMaxAttendees(12);

        Long eventId = eventService.createEvent(group.getId(), eventRequest, owner.getId());
        System.out.println("테스트 이벤트(ID: " + eventId + ") 데이터 생성 완료.");
    }
}