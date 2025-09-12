package com.csu.csu_backend.service;

import com.csu.csu_backend.controller.dto.AuthDTO;
import com.csu.csu_backend.controller.dto.AuthDTO.LoginRequest;
import com.csu.csu_backend.controller.dto.AuthDTO.SignUpRequest;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.exception.DuplicateResourceException;
import com.csu.csu_backend.exception.ResourceNotFoundException;
import com.csu.csu_backend.repository.UserRepository;
import com.csu.csu_backend.security.JwtTokenProvider;
import com.csu.csu_backend.security.UserPrincipal; // UserPrincipal 임포트 추가
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails; // UserDetails 임포트 추가
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public Long registerUser(SignUpRequest signUpRequest) {
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new DuplicateResourceException("이미 가입된 이메일입니다: " + signUpRequest.getEmail());
        }

        User user = new User(
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()),
                signUpRequest.getNickname(),
                signUpRequest.getRegion()
        );

        return userRepository.save(user).getId();
    }

    @Transactional
    public AuthDTO.TokenResponse loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        user.updateRefreshToken(refreshToken);
        userRepository.save(user);

        return new AuthDTO.TokenResponse(jwt, refreshToken);
    }

    @Transactional
    public AuthDTO.TokenResponse refresh(String refreshToken) {
        if (!tokenProvider.validateRefreshToken(refreshToken)) {
            throw new IllegalArgumentException("유효하지 않은 리프레시 토큰입니다.");
        }

        User user = userRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new ResourceNotFoundException("리프레시 토큰에 해당하는 사용자를 찾을 수 없습니다."));

        // User 엔티티를 Spring Security가 이해하는 UserDetails(UserPrincipal)로 변환
        UserDetails userDetails = UserPrincipal.create(user);
        // UserDetails를 사용하여 Authentication 객체 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        String newAccessToken = tokenProvider.generateToken(authentication);
        String newRefreshToken = tokenProvider.generateRefreshToken(authentication);

        user.updateRefreshToken(newRefreshToken);
        userRepository.save(user);

        return new AuthDTO.TokenResponse(newAccessToken, newRefreshToken);
    }
}