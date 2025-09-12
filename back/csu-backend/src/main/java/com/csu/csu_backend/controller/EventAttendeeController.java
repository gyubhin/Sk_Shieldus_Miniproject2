package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.EventAttendeeResponse;
import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.service.EventAttendeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events/{eventId}/attendees")
@RequiredArgsConstructor
public class EventAttendeeController {

    private final EventAttendeeService eventAttendeeService;

    @PostMapping
    public ResponseEntity<String> applyToEvent(@PathVariable Long eventId) {
        // TODO: Get user ID from security context
        Long currentUserId = 1L;
        eventAttendeeService.applyToEvent(eventId, currentUserId);
        return ResponseEntity.ok("Successfully applied to the event.");
    }

    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse> cancelAttendance(@PathVariable Long eventId) {
        // TODO: Get user ID from security context
        Long currentUserId = 1L;
        eventAttendeeService.cancelAttendance(eventId, currentUserId);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @GetMapping
    public ResponseEntity<List<EventAttendeeResponse>> getAttendees(@PathVariable Long eventId) {
        List<EventAttendeeResponse> attendees = eventAttendeeService.getAttendees(eventId);
        return ResponseEntity.ok(attendees);
    }

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
