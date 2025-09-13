package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.controller.dto.UserDTO;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "유저 API", description = "유저 CRUD API")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "현재 로그인한 사용자의 상세 정보를 조회 API")
    @GetMapping("/me")
    public ResponseEntity<UserDTO.UserDetailResponse> getMyInfo(@AuthenticationPrincipal UserPrincipal currentUser) {
        UserDTO.UserDetailResponse userDetail = userService.getUserDetail(currentUser.getId());
        return ResponseEntity.ok(userDetail);
    }

    @Operation(summary = "특정 사용자의 상세 정보를 조회 API")
    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO.UserDetailResponse> getUserInfo(@PathVariable Long userId) {
        UserDTO.UserDetailResponse userDetail = userService.getUserDetail(userId);
        return ResponseEntity.ok(userDetail);
    }

    // --- 아래 updateUser 메서드를 새로 추가 ---
    @Operation(summary = "내 정보 수정 API (닉네임, 지역, 소개)")
    @PatchMapping("/me")
    public ResponseEntity<ApiResponse> updateUser(@AuthenticationPrincipal UserPrincipal currentUser,
                                                  @Valid @RequestBody UserDTO.UpdateUserRequest request) {
        userService.updateUser(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "회원 탈퇴 API")
    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse> withdrawUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        userService.deleteUser(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "프로필/이미지 업로드/수정 API")
    @PostMapping("/{userId}/profile-image")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long userId,
                                                     @AuthenticationPrincipal UserPrincipal currentUser,
                                                     @RequestParam("file") MultipartFile file) {
        if (!userId.equals(currentUser.getId())) {
            return ResponseEntity.status(403).body("자신의 프로필만 수정할 수 있습니다.");
        }

        String path = userService.updateProfileImage(userId, file);
        return ResponseEntity.ok(path);
    }


    @Operation(summary = "프로필 이미지 삭제")
    @DeleteMapping("/{userId}/profile-image")
    public ResponseEntity<ApiResponse> deleteProfileImage(@PathVariable Long userId,
                                                          @AuthenticationPrincipal UserPrincipal currentUser) {
        if (!userId.equals(currentUser.getId())) {
            return ResponseEntity.status(403).build();
        }

        userService.deleteProfileImage(userId);
        return ResponseEntity.ok(ApiResponse.ok());
    }
}