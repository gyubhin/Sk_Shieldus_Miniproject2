package com.csu.csu_backend.controller;

import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * 현재 로그인한 사용자의 회원 탈퇴를 처리합니다.
     * @param currentUser 현재 인증된 사용자 정보
     * @return 성공 시 204 No Content 응답
     */
    @DeleteMapping("/me")
    public ResponseEntity<Void> withdrawUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        userService.deleteUser(currentUser.getId());
        return ResponseEntity.noContent().build();
    }
}