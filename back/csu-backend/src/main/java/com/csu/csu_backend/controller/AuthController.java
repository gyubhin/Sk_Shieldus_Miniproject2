package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.AuthDTO.LoginRequest;
import com.csu.csu_backend.controller.dto.AuthDTO.SignUpRequest;
import com.csu.csu_backend.controller.dto.AuthDTO.TokenResponse;
import com.csu.csu_backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Tag(name = "인증 API", description = "인증 CRUD API")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "회원가입 API")
    @PostMapping("/signup")
    public ResponseEntity<TokenResponse> registerUser(
            @Valid @RequestBody SignUpRequest request,
            HttpServletResponse response) {
        Long userId = authService.registerUser(request);
        AuthService.TokenPair tokenPair = authService.generateTokenAfterSignup(userId);
        response.addHeader("refreshToken", tokenPair.getRefreshToken());
        return ResponseEntity.ok(new TokenResponse(tokenPair.getAccessToken()));
    }

    @Operation(summary = "로그인 API")
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> authenticateUser(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        AuthService.TokenPair tokenPair = authService.loginUser(request);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", tokenPair.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(new TokenResponse(tokenPair.getAccessToken()));
    }

    @Operation(summary = "로그아웃 API")
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        return ResponseEntity.ok("성공적으로 로그아웃되었습니다.");
    }

    @Operation(summary = "토큰 재발급 API")
    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@CookieValue("refreshToken") String refreshToken, HttpServletResponse response) {
        AuthService.TokenPair newToken = authService.refresh(refreshToken);
        ResponseCookie cookie = ResponseCookie.from("refreshToken", newToken.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(new TokenResponse(newToken.getAccessToken()));
    }

}