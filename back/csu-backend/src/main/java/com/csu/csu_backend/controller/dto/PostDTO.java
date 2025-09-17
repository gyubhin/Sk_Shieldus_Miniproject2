package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.Post;
import com.csu.csu_backend.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class PostDTO {

    @Getter
    @NoArgsConstructor
    public static class CreatePostRequest {
        @NotBlank(message = "게시글 제목은 필수입니다.")
        private String title;
        @NotBlank(message = "게시글 내용은 필수입니다.")
        private String content;
        private String imageUrl;

        public Post toEntity(User user, Group group) {
            return Post.builder()
                    .title(title)
                    .content(content)
                    .imageUrl(imageUrl)
                    .user(user)
                    .group(group)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    public static class UpdatePostRequest {
        @NotBlank(message = "게시글 제목은 필수입니다.")
        private String title;
        @NotBlank(message = "게시글 내용은 필수입니다.")
        private String content;
        private String imageUrl;
    }


    @Getter
    @NoArgsConstructor
    public static class PostResponse {
        private Long id;
        private String title;
        private String content;
        private String imageUrl;
        private LocalDateTime createdAt;
        private String authorNickname;
        private Long authorId;
        private String authorProfileImageUrl;
        private Long groupId; // 필드 추가

        public PostResponse(Post post) {
            this.id = post.getId();
            this.title = post.getTitle();
            this.content = post.getContent();
            this.imageUrl = post.getImageUrl();
            this.createdAt = post.getCreatedAt();
            this.authorNickname = post.getUser().getNickname();
            this.authorId = post.getUser().getId();
            this.authorProfileImageUrl = post.getUser().getProfileImageUrl();
            this.groupId = post.getGroup().getId(); // 값 설정
        }
    }

    @Getter
    @NoArgsConstructor
    public static class PostDetailResponse {
        private Long id;
        private String title;
        private String content;
        private String imageUrl;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private String authorNickname;
        private Long authorId;
        private String authorProfileImageUrl;
        private Long groupId; // 필드 추가
        private List<CommentDTO.CommentResponse> comments;

        public PostDetailResponse(Post post) {
            this.id = post.getId();
            this.title = post.getTitle();
            this.content = post.getContent();
            this.imageUrl = post.getImageUrl();
            this.createdAt = post.getCreatedAt();
            this.updatedAt = post.getUpdatedAt();
            this.authorNickname = post.getUser().getNickname();
            this.authorId = post.getUser().getId();
            this.authorProfileImageUrl = post.getUser().getProfileImageUrl();
            this.groupId = post.getGroup().getId(); // 값 설정
            this.comments = post.getComments().stream()
                    .filter(comment -> comment.getParent() == null)
                    .map(CommentDTO.CommentResponse::new)
                    .collect(Collectors.toList());
        }
    }
}