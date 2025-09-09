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
        private String role;

        public MemberResponse(Membership membership) {
            this.userId = membership.getUser().getId();
            this.nickname = membership.getUser().getNickname();
            this.role = membership.getRole();
        }
    }
}