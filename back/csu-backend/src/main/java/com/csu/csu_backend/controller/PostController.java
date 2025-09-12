package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.PostDTO.CreatePostRequest;
import com.csu.csu_backend.controller.dto.PostDTO.PostDetailResponse;
import com.csu.csu_backend.controller.dto.PostDTO.PostResponse;
import com.csu.csu_backend.controller.dto.PostDTO.UpdatePostRequest;
import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.controller.dto.Response.CursorPagingResponse;
import com.csu.csu_backend.controller.dto.Response.PagingResponse;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "게시글 API", description = "게시글 CRUD API")
@RestController
@RequestMapping("/api/groups/{groupId}/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @Operation(summary = "게시글 생성 API")
    @PostMapping
    public ResponseEntity<Void> createPost(@PathVariable Long groupId,
                                           @Valid @RequestBody CreatePostRequest request,
                                           @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        Long postId = postService.createPost(groupId, userId, request);
        return ResponseEntity.created(URI.create(String.format("/api/groups/%d/posts/%d", groupId, postId))).build();
    }

    @Operation(summary = "그룹의 게시글 목록 조회 API")
    @GetMapping
    public ResponseEntity<PagingResponse<PostResponse>> getAllPostsByGroup(
            @PathVariable Long groupId,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        PagingResponse<PostResponse> posts = postService.getAllPostsByGroup(groupId, pageable);
        return ResponseEntity.ok(posts);
    }

    @Operation(summary = "그룹의 상세 게시글 조회 API")
    @GetMapping("/{postId}")
    public ResponseEntity<PostDetailResponse> getPost(@PathVariable Long groupId, @PathVariable Long postId) {
        PostDetailResponse post = postService.getPost(groupId, postId);
        return ResponseEntity.ok(post);
    }

    @Operation(summary = "그룹의 게시글 수정 API")
    @PatchMapping("/{postId}")
    public ResponseEntity<ApiResponse> updatePost(@PathVariable Long groupId,
                                                  @PathVariable Long postId,
                                                  @Valid @RequestBody UpdatePostRequest request,
                                                  @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        postService.updatePost(groupId, postId, userId, request);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "그룹의 게시글 삭제 API")
    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Long groupId,
                                                  @PathVariable Long postId,
                                                  @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        postService.deletePost(groupId, postId, userId);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "그룹의 게시글 이미지 업로드/수정 API")
    @PostMapping("/{postId}/image")
    public ResponseEntity<String> uploadPostImage(@PathVariable Long groupId,
                                                  @PathVariable Long postId,
                                                  @AuthenticationPrincipal UserPrincipal currentUser,
                                                  @RequestParam("file") MultipartFile file) {
        String path = postService.updatePostImage(groupId, postId, currentUser.getId(), file);
        return ResponseEntity.ok(path);
    }

    @Operation(summary = "그룹의 게시글 이미지 삭제 API")
    @DeleteMapping("/{postId}/image")
    public ResponseEntity<ApiResponse> deletePostImage(@PathVariable Long groupId,
                                                       @PathVariable Long postId,
                                                       @AuthenticationPrincipal UserPrincipal currentUser) {
        postService.deletePostImage(groupId, postId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "그룹의 게시글 무한스크롤 조회 API (커서 기반)")
    @GetMapping("/infinite")
    public ResponseEntity<CursorPagingResponse<PostResponse>> getPostsByGroupWithCursor(
            @PathVariable Long groupId,
            @RequestParam(required = false) String cursor, // 마지막 createdAt
            @RequestParam(defaultValue = "10") int size) {

        CursorPagingResponse<PostResponse> posts = postService.getPostsByGroupWithCursor(groupId, cursor, size);
        return ResponseEntity.ok(posts);
    }
}