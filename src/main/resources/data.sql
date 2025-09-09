-- 테스트용 사용자 데이터 (비밀번호는 암호화되지 않은 상태)
INSERT INTO users (user_id, email, password, nickname, created_at) VALUES
(1, 'owner@test.com', 'password123', '그룹장', NOW()),
(2, 'member@test.com', 'password123', '일반멤버', NOW());

-- 테스트용 카테고리 데이터
INSERT INTO categories (category_id, name) VALUES
(1, '운동'),
(2, '스터디'),
(3, '여행');