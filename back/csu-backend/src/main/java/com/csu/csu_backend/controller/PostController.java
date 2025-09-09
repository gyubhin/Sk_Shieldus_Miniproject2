package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.PostDTO.CreatePostRequest;
import com.csu.csu_backend.controller.dto.PostDTO.PostResponse;
import com.csu.csu_backend.controller.dto.PostDTO.PostDetailResponse;
import com.csu.csu_backend.controller.dto.PostDTO.UpdatePostRequest;
import com.csu.csu_backend.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/groups/{groupId}/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 게시글 생성
    @PostMapping
    public ResponseEntity<Void> createPost(@PathVariable Long groupId, @Valid @RequestBody CreatePostRequest request) {
        // TODO: userId는 인증 후 추출
        Long userId = 1L;
        Long postId = postService.createPost(groupId, userId, request);
        return ResponseEntity.created(URI.create(String.format("/api/groups/%d/posts/%d", groupId, postId))).build();
    }

    // 게시글 전체 목록 조회 (페이징 포함)
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPostsByGroup(@PathVariable Long groupId,
                                                                 @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(postService.getAllPostsByGroup(groupId, pageable));
    }

    // 게시글 상세 조회
    @GetMapping("/{postId}")
    public ResponseEntity<PostDetailResponse> getPost(@PathVariable Long groupId, @PathVariable Long postId) {
        return ResponseEntity.ok(postService.getPost(groupId, postId));
    }

    // 게시글 수정
    @PutMapping("/{postId}")
    public ResponseEntity<Void> updatePost(@PathVariable Long groupId, @PathVariable Long postId,
                                           @Valid @RequestBody UpdatePostRequest request) {
        // TODO: userId는 인증 후 추출
        Long userId = 1L;
        postService.updatePost(groupId, postId, userId, request);
        return ResponseEntity.noContent().build();
    }

    // 게시글 삭제 (논리적 삭제)
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long groupId, @PathVariable Long postId) {
        // TODO: userId는 인증 후 추출
        Long userId = 1L;
        postService.deletePost(groupId, postId, userId);
        return ResponseEntity.noContent().build();
    }
}
