package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.AuthDTO.LoginRequest;
import com.csu.csu_backend.controller.dto.AuthDTO.SignUpRequest;
import com.csu.csu_backend.controller.dto.AuthDTO.TokenResponse;
import com.csu.csu_backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;

@Tag(name = "인증 API", description = "인증 CRUD API")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "회원가입 API")
    @PostMapping("/signup")
    public ResponseEntity<Void> registerUser(@Valid @RequestBody SignUpRequest request) {
        Long userId = authService.registerUser(request);
        return ResponseEntity.created(URI.create("/api/users/" + userId)).build();
    }

    @Operation(summary = "로그인 API")
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> authenticateUser(@Valid @RequestBody LoginRequest request) {
        TokenResponse token = authService.loginUser(request);
        return ResponseEntity.ok(token);
    }

    @Operation(summary = "로그아웃 API")
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        return ResponseEntity.ok("성공적으로 로그아웃되었습니다.");
    }

    // 추가: 리프레시 토큰을 사용해 토큰 재발급 API
    @Operation(summary = "토큰 재발급 API")
    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@RequestBody String refreshToken) {
        TokenResponse newToken = authService.refresh(refreshToken);
        return ResponseEntity.ok(newToken);
    }
}