package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.EventAttendeeResponse;
import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.service.EventAttendeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import com.csu.csu_backend.security.UserPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "이벤트 참석 API", description = "참석 CRUD API")
@RestController
@RequestMapping("/api/events/{eventId}/attendees")
@RequiredArgsConstructor
public class EventAttendeeController {

    private final EventAttendeeService eventAttendeeService;

    @Operation(summary = "참석 신청 API")
    @PostMapping
    public ResponseEntity<String> applyToEvent(@PathVariable Long eventId, @AuthenticationPrincipal UserPrincipal currentUser) {
        Long currentUserId = currentUser.getId(); // 실제 로그인한 유저 ID를 가져옴
        eventAttendeeService.applyToEvent(eventId, currentUserId);
        return ResponseEntity.ok("Successfully applied to the event.");
    }

    @Operation(summary = "참석 취소 API")
    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse> cancelAttendance(@PathVariable Long eventId) {
        // TODO: Get user ID from security context
        Long currentUserId = 1L;
        eventAttendeeService.cancelAttendance(eventId, currentUserId);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "참석자 목록 API")
    @GetMapping
    public ResponseEntity<List<EventAttendeeResponse>> getAttendees(@PathVariable Long eventId) {
        List<EventAttendeeResponse> attendees = eventAttendeeService.getAttendees(eventId);
        return ResponseEntity.ok(attendees);
    }

    @Operation(summary = "참석 상태 변경 API")
    @PatchMapping("/{userId}")
    public ResponseEntity<EventAttendeeResponse> changeAttendanceStatus(@PathVariable Long eventId, @PathVariable Long userId, @RequestBody Map<String, String> statusMap) {
        String status = statusMap.get("status");
        if (status == null) {
            return ResponseEntity.badRequest().build();
        }
        EventAttendeeResponse updatedAttendee = eventAttendeeService.changeStatus(eventId, userId, status);
        return ResponseEntity.ok(updatedAttendee);
    }
}
