package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.Notice;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class NoticeDTO {

    @Getter
    @NoArgsConstructor
    public static class CreateNoticeRequest {
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    @Getter
    @NoArgsConstructor
    public static class UpdateNoticeRequest {
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    @Getter
    public static class NoticeResponse {
        private Long id;
        private String title;
        private String content;
        private String authorNickname;   // 작성자 닉네임만
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public NoticeResponse(Notice notice) {
            this.id = notice.getId();
            this.title = notice.getTitle();
            this.content = notice.getContent();
            this.authorNickname = notice.getUser().getNickname();
            this.createdAt = notice.getCreatedAt();
            this.updatedAt = notice.getUpdatedAt();
        }
    }
}
