package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.NoticeDTO;
import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @Operation(summary = "공지사항 생성 API")
    @PostMapping
    public ResponseEntity<ApiResponse> createNotice(@AuthenticationPrincipal UserPrincipal currentUser,
                                             @Valid @RequestBody NoticeDTO.CreateNoticeRequest request) {
        Long noticeId = noticeService.createNotice(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "공지사항 단건 조회 API")
    @GetMapping("/{noticeId}")
    public ResponseEntity<NoticeDTO.NoticeResponse> getNotice(@PathVariable Long noticeId) {
        return ResponseEntity.ok(noticeService.getNotice(noticeId));
    }

    @Operation(summary = "공지사항 전체 조회 API")
    @GetMapping
    public ResponseEntity<List<NoticeDTO.NoticeResponse>> getAllNotices() {
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    @Operation(summary = "공지사항 수정 API")
    @PutMapping("/{noticeId}")
    public ResponseEntity<Void> updateNotice(@PathVariable Long noticeId,
                                             @AuthenticationPrincipal UserPrincipal currentUser,
                                             @Valid @RequestBody NoticeDTO.UpdateNoticeRequest request) {
        noticeService.updateNotice(noticeId, currentUser.getId(), request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "공지사항 삭제 API")
    @DeleteMapping("/{noticeId}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long noticeId,
                                             @AuthenticationPrincipal UserPrincipal currentUser) {
        noticeService.deleteNotice(noticeId, currentUser.getId());
        return ResponseEntity.noContent().build();
    }
}
