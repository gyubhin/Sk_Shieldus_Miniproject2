package com.csu.csu_backend.runner;

import com.csu.csu_backend.entity.Category;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.repository.CategoryRepository;
import com.csu.csu_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // 데이터가 이미 있는 경우 중복 실행 방지
        if (userRepository.count() > 0 || categoryRepository.count() > 0) {
            System.out.println("초기 데이터가 이미 존재하므로, 생성을 건너뜁니다.");
            return;
        }

        // 1. 테스트용 사용자 데이터 생성
        User owner = new User("owner@test.com", "password123", "그룹장");
        User member = new User("member@test.com", "password123", "일반멤버");

        userRepository.save(owner);
        userRepository.save(member);
        System.out.println("테스트 사용자 데이터 생성 완료.");

        // 2. 테스트용 카테고리 데이터 생성
        Category sports = new Category("운동");
        Category study = new Category("스터디");
        Category travel = new Category("여행");

        categoryRepository.save(sports);
        categoryRepository.save(study);
        categoryRepository.save(travel);
        System.out.println("테스트 카테고리 데이터 생성 완료.");
    }
}