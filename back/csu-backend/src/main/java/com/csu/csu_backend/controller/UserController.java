package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.Response.ApiResponse;
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

    @Operation(summary = "회원 탈퇴 API")
    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse> withdrawUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        userService.deleteUser(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "프로필/이미지 업로드/수정 API")
    @PostMapping("/{userid}/profile-image")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long id,
                                                     @AuthenticationPrincipal UserPrincipal currentUser,
                                                     @RequestParam("file") MultipartFile file) {
        // 권한 체크
        if (!id.equals(currentUser.getId())) {
            return ResponseEntity.status(403).body("자신의 프로필만 수정할 수 있습니다.");
        }

        String path = userService.updateProfileImage(id, file);
        return ResponseEntity.ok(path);
    }


    @Operation(summary = "프로필 이미지 삭제")
    @DeleteMapping("/{userid}/profile-image")
    public ResponseEntity<ApiResponse> deleteProfileImage(@PathVariable Long id,
                                                          @AuthenticationPrincipal UserPrincipal currentUser) {
        if (!id.equals(currentUser.getId())) {
            return ResponseEntity.status(403).build();
        }

        userService.deleteProfileImage(id);
        return ResponseEntity.ok(ApiResponse.ok());
    }

}