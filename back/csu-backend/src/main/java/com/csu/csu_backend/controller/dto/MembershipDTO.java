package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.Membership;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class MembershipDTO {

    @Getter
    @NoArgsConstructor
    public static class MemberResponse {
        private Long userId;
        private String nickname;
        private String profileImageUrl; // 필드 추가
        private String role;
        private String introduction;

        public MemberResponse(Membership membership) {
            this.userId = membership.getUser().getId();
            this.nickname = membership.getUser().getNickname();
            this.profileImageUrl = membership.getUser().getProfileImageUrl(); // 값 설정
            this.role = membership.getRole();
            this.introduction = membership.getUser().getIntroduction();
        }
    }
}