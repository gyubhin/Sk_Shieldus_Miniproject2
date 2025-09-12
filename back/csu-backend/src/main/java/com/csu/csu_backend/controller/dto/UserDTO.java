package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDTO {

    @Getter
    @NoArgsConstructor
    public static class UserDetailResponse {
        private Long id;
        private String email;
        private String nickname;
        private String region;
        private String profileImageUrl;
        private String introduction;

        public UserDetailResponse(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.nickname = user.getNickname();
            this.region = user.getRegion();
            this.profileImageUrl = user.getProfileImageUrl();
            this.introduction = user.getIntroduction();
        }
    }
}