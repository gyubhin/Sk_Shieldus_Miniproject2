package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.Comment;
import com.csu.csu_backend.entity.Post;
import com.csu.csu_backend.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class CommentDTO {

    @Getter
    @NoArgsConstructor
    public static class CreateCommentRequest {
        @NotBlank(message = "댓글 내용은 필수입니다.")
        private String content;
        private Long parentId;
    }

    @Getter
    @NoArgsConstructor
    public static class UpdateCommentRequest {
        @NotBlank(message = "댓글 내용은 필수입니다.")
        private String content;
    }

    @Setter
    @Getter
    @NoArgsConstructor
    public static class CommentResponse {
        private Long id;
        private String content;
        private LocalDateTime createdAt;
        private String authorNickname;
        private Long authorId;
        private String authorProfileImageUrl; // 필드 추가
        private List<CommentResponse> children;

        private Long parentId;
        private String parentAuthorNickname;

        public CommentResponse(Comment comment) {
            this.id = comment.getId();
            this.content = comment.getContent();
            this.createdAt = comment.getCreatedAt();
            this.authorNickname = comment.getUser().getNickname();
            this.authorId = comment.getUser().getId();
            this.authorProfileImageUrl = comment.getUser().getProfileImageUrl(); // 값 설정

            // 중복 조회 방지
            this.children = List.of();

            // 타겟 정보
            if (comment.getParent() != null) {
                this.parentId = comment.getParent().getId();
                this.parentAuthorNickname = comment.getParent().getUser().getNickname();
            }
        }

    }

    @Getter
    @NoArgsConstructor
    public static class MyCommentResponse {
        private Long id;
        private String content;
        private LocalDateTime createdAt;
        private Long postId;
        private String postTitle;
        private Long groupId;

        public MyCommentResponse(Comment comment) {
            this.id = comment.getId();
            this.content = comment.getContent();
            this.createdAt = comment.getCreatedAt();
            this.postId = comment.getPost().getId();
            this.postTitle = comment.getPost().getTitle();
            this.groupId = comment.getPost().getGroup().getId();
        }
    }

}