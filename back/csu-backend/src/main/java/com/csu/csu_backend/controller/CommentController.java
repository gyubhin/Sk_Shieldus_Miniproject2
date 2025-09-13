package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.CommentDTO;
import com.csu.csu_backend.controller.dto.CommentDTO.CreateCommentRequest;
import com.csu.csu_backend.controller.dto.CommentDTO.UpdateCommentRequest;
import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Tag(name = "댓글 API", description = "댓글 CRUD API")
@RestController
@RequestMapping("/api/groups/{groupId}/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 댓글/대댓글 생성
    @Operation(summary = "댓글,답글 생성 API")
    @PostMapping
    public ResponseEntity<Void> createComment(@PathVariable Long groupId, @PathVariable Long postId,
                                              @Valid @RequestBody CreateCommentRequest request,
                                              @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        Long commentId = commentService.createComment(postId, userId, request);
        return ResponseEntity.created(URI.create(String.format("/api/groups/%d/posts/%d/comments/%d", groupId, postId, commentId))).build();
    }

    // 댓글 수정
    @Operation(summary = "댓글,답글 수정 API")
    @PatchMapping("/{commentId}")
    public ResponseEntity<ApiResponse> updateComment(@PathVariable Long commentId, @Valid @RequestBody UpdateCommentRequest request,
                                              @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        commentService.updateComment(commentId, userId, request);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    // 댓글 삭제 (논리적 삭제)
    @Operation(summary = "댓글,답글 삭제 API")
    @DeleteMapping("/{commentId}")
    public ResponseEntity<ApiResponse> deleteComment(@PathVariable Long commentId,
                                              @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "댓글 + 답글 조회 API ")
    @GetMapping
    public ResponseEntity<List<CommentDTO.CommentResponse>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getComments(postId));
    }

}