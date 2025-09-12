package com.csu.csu_backend.runner;

import com.csu.csu_backend.entity.Category;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.repository.CategoryRepository;
import com.csu.csu_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // 데이터가 이미 있는 경우 중복 실행 방지
        if (userRepository.count() == 0) {
            // 1. 테스트용 사용자 데이터 생성 (비밀번호 암호화)
            User owner = new User("owner@test.com", passwordEncoder.encode("password123"), "그룹장");
            User member1 = new User("member@test.com", passwordEncoder.encode("password123"), "일반멤버1");
            User member2 = new User("test@test.com", passwordEncoder.encode("password123"), "일반멤버2");
            User admin = new User("admin@test.com", passwordEncoder.encode("password123"), "관리자");

            userRepository.save(owner);
            userRepository.save(member1);
            userRepository.save(member2);
            userRepository.save(admin);

            System.out.println("테스트 사용자 데이터 생성 완료.");
        }


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
    }
}