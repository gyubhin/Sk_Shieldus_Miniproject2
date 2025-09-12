package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.PostDTO.CreatePostRequest;
import com.csu.csu_backend.controller.dto.PostDTO.PostResponse;
import com.csu.csu_backend.controller.dto.PostDTO.UpdatePostRequest;
import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/groups/{groupId}/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 그룹 내 게시글 목록 조회 API
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPostsByGroup(
            @PathVariable Long groupId,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        List<PostResponse> posts = postService.getAllPostsByGroup(groupId, pageable);
        return ResponseEntity.ok(posts);
    }

    // 이하 생략... 기존 PostController의 나머지 메서드들을 여기에 포함시켜야 합니다.
    // ...

    @PostMapping("/{postId}/image")
    public ResponseEntity<String> uploadPostImage(@PathVariable Long groupId,
                                                  @PathVariable Long postId,
                                                  @AuthenticationPrincipal UserPrincipal currentUser,
                                                  @RequestParam("file") MultipartFile file) {
        String path = postService.updatePostImage(groupId, postId, currentUser.getId(), file);
        return ResponseEntity.ok(path);
    }

    @DeleteMapping("/{postId}/image")
    public ResponseEntity<ApiResponse> deletePostImage(@PathVariable Long groupId,
                                                       @PathVariable Long postId,
                                                       @AuthenticationPrincipal UserPrincipal currentUser) {
        postService.deletePostImage(groupId, postId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }

}