package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.CommentDTO.CreateCommentRequest;
import com.csu.csu_backend.controller.dto.CommentDTO.UpdateCommentRequest;
import com.csu.csu_backend.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;

@RestController
@RequestMapping("/api/groups/{groupId}/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 댓글/대댓글 생성
    @PostMapping
    public ResponseEntity<Void> createComment(@PathVariable Long postId, @Valid @RequestBody CreateCommentRequest request) {
        // TODO: userId는 인증 후 추출
        Long userId = 1L;
        Long commentId = commentService.createComment(postId, userId, request);
        return ResponseEntity.created(URI.create(String.format("/api/groups/%d/posts/%d/comments/%d", 1L, postId, commentId))).build();
    }

    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<Void> updateComment(@PathVariable Long commentId, @Valid @RequestBody UpdateCommentRequest request) {
        // TODO: userId는 인증 후 추출
        Long userId = 1L;
        commentService.updateComment(commentId, userId, request);
        return ResponseEntity.noContent().build();
    }

    // 댓글 삭제 (논리적 삭제)
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        // TODO: userId는 인증 후 추출
        Long userId = 1L;
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.noContent().build();
    }
}
