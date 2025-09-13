package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.controller.dto.UserDTO; // 추가
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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

    
    // --- 아래 2개 메서드를 새로 추가 ---
    /**
     * 현재 로그인한 사용자의 상세 정보를 조회합니다.
     */
    @Operation(summary = "현재 로그인한 사용자의 상세 정보를 조회 API")
    @GetMapping("/me")
    public ResponseEntity<UserDTO.UserDetailResponse> getMyInfo(@AuthenticationPrincipal UserPrincipal currentUser) {
        UserDTO.UserDetailResponse userDetail = userService.getUserDetail(currentUser.getId());
        return ResponseEntity.ok(userDetail);
    }

    /**
     * 특정 사용자의 상세 정보를 조회합니다.
     */
    @Operation(summary = "특정 사용자의 상세 정보를 조회 API")
    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO.UserDetailResponse> getUserInfo(@PathVariable Long userId) {
        UserDTO.UserDetailResponse userDetail = userService.getUserDetail(userId);
        return ResponseEntity.ok(userDetail);
    }

    @Operation(summary = "회원 탈퇴 API")
    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse> withdrawUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        userService.deleteUser(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "프로필/이미지 업로드/수정 API")
    @PostMapping("/{userId}/profile-image") // userId로 변수명 통일
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long userId,
                                                     @AuthenticationPrincipal UserPrincipal currentUser,
                                                     @RequestParam("file") MultipartFile file) {
        // 권한 체크
        if (!userId.equals(currentUser.getId())) {
            return ResponseEntity.status(403).body("자신의 프로필만 수정할 수 있습니다.");
        }

        String path = userService.updateProfileImage(userId, file);
        return ResponseEntity.ok(path);
    }


    @Operation(summary = "프로필 이미지 삭제")
    @DeleteMapping("/{userId}/profile-image") // userId로 변수명 통일
    public ResponseEntity<ApiResponse> deleteProfileImage(@PathVariable Long userId,
                                                          @AuthenticationPrincipal UserPrincipal currentUser) {
        if (!userId.equals(currentUser.getId())) {
            return ResponseEntity.status(403).build();
        }

        userService.deleteProfileImage(userId);
        return ResponseEntity.ok(ApiResponse.ok());
    }
}