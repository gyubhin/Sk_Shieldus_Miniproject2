package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.PostDTO.CreatePostRequest;
import com.csu.csu_backend.controller.dto.PostDTO.UpdatePostRequest;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/groups/{groupId}/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 게시글 생성
    @PostMapping
    public ResponseEntity<Void> createPost(@PathVariable Long groupId, @Valid @RequestBody CreatePostRequest request,
                                           @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        Long postId = postService.createPost(groupId, userId, request);
        return ResponseEntity.created(URI.create(String.format("/api/groups/%d/posts/%d", groupId, postId))).build();
    }

    // 게시글 수정
    @PatchMapping("/{postId}")
    public ResponseEntity<Void> updatePost(@PathVariable Long groupId, @PathVariable Long postId,
                                           @Valid @RequestBody UpdatePostRequest request,
                                           @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        postService.updatePost(groupId, postId, userId, request);
        return ResponseEntity.noContent().build();
    }

    // 게시글 삭제 (논리적 삭제)
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long groupId, @PathVariable Long postId,
                                           @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        postService.deletePost(groupId, postId, userId);
        return ResponseEntity.noContent().build();
    }
}