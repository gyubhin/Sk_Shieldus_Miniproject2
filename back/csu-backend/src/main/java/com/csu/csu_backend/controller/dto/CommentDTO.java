package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.Comment;
import com.csu.csu_backend.entity.Post;
import com.csu.csu_backend.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
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

    @Getter
    @NoArgsConstructor
    public static class CommentResponse {
        private Long id;
        private String content;
        private LocalDateTime createdAt;
        private String authorNickname;
        private Long authorId;
        private List<CommentResponse> children;

        public CommentResponse(Comment comment) {
            this.id = comment.getId();
            this.content = comment.getContent();
            this.createdAt = comment.getCreatedAt();
            this.authorNickname = comment.getUser().getNickname();
            this.authorId = comment.getUser().getId();
            this.children = comment.getChildren().stream()
                    .map(CommentResponse::new)
                    .collect(Collectors.toList());
        }
    }
}
