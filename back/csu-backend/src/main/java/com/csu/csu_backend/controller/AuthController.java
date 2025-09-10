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
}