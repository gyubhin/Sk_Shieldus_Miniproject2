package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.AuthDTO.LoginRequest;
import com.csu.csu_backend.controller.dto.AuthDTO.SignUpRequest;
import com.csu.csu_backend.controller.dto.AuthDTO.TokenResponse;
import com.csu.csu_backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Void> registerUser(@Valid @RequestBody SignUpRequest request) {
        Long userId = authService.registerUser(request);
        return ResponseEntity.created(URI.create("/api/users/" + userId)).build();
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> authenticateUser(@Valid @RequestBody LoginRequest request) {
        TokenResponse token = authService.loginUser(request);
        return ResponseEntity.ok(token);
    }

    /**
     * 로그아웃을 처리합니다.
     * 클라이언트는 이 API 호출 성공 시 저장된 JWT를 삭제해야 합니다.
     */
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        // Stateless 방식이므로 서버에서는 별도의 세션/토큰 무효화 처리가 기본적으로는 필요 없음.
        // 클라이언트 측에서 토큰을 삭제하는 것이 핵심.
        // 추후 필요시 Redis 등을 이용한 토큰 블랙리스트 관리를 여기에 추가할 수 있음.
        return ResponseEntity.ok("성공적으로 로그아웃되었습니다.");
    }
}