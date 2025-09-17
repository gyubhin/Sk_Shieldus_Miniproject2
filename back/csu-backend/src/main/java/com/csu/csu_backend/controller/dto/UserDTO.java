package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDTO {

    @Getter
    @NoArgsConstructor
    public static class UpdateUserRequest {
        private String nickname;
        private String region;
        private String introduction;
        private String profileImageUrl; // 필드 추가
    }

    @Getter
    @NoArgsConstructor
    public static class UserDetailResponse {
        private Long id;
        private String email;
        private String nickname;
        private String region;
        private String profileImageUrl;
        private String introduction;
        private long postCount; // 내가 쓴 게시글
        private long commentCount;

        public UserDetailResponse(User user, long postCount, long commentCount) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.nickname = user.getNickname();
            this.region = user.getRegion();
            this.profileImageUrl = user.getProfileImageUrl();
            this.introduction = user.getIntroduction();
            this.postCount = postCount;
            this.commentCount = commentCount;
        }
    }
}