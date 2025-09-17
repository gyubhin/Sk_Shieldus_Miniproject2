package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.EventRequest;
import com.csu.csu_backend.controller.dto.EventResponse;
import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.controller.dto.Response.PagingResponse;
import com.csu.csu_backend.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Tag(name = "이벤트(일정) API", description = "이벤트(일정) CRUD API")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @Operation(summary = "이벤트 생성 API")
    @PostMapping("/groups/{groupId}/events")
    public ResponseEntity<Void> createEvent(@PathVariable Long groupId, @Valid @RequestBody EventRequest request) {
        // TODO: Get user ID from security context
        Long currentUserId = 1L; // Placeholder
        Long eventId = eventService.createEvent(groupId, request, currentUserId);
        return ResponseEntity.created(URI.create("/api/events/" + eventId)).build();
    }

    @Operation(summary = "이벤트 목록 조회 API")
    @GetMapping("/groups/{groupId}/events")
    public ResponseEntity<PagingResponse<EventResponse>> getEvents(
            @PathVariable Long groupId,
            @PageableDefault(sort = "startAt", direction = Sort.Direction.DESC) Pageable pageable) {
        PagingResponse<EventResponse> events = eventService.getEventsByGroup(groupId, pageable);
        return ResponseEntity.ok(events);
    }

    @Operation(summary = "이벤트 상세 조회 API")
    @GetMapping("/events/{eventId}")
    public ResponseEntity<EventResponse> getEvent(@PathVariable Long eventId) {
        EventResponse event = eventService.getEvent(eventId);
        return ResponseEntity.ok(event);
    }

    @Operation(summary = "이벤트 수정 API")
    @PatchMapping("/events/{eventId}")
    public ResponseEntity<EventResponse> updateEvent(@PathVariable Long eventId, @Valid @RequestBody EventRequest request) {
        EventResponse updatedEvent = eventService.updateEvent(eventId, request);
        return ResponseEntity.ok(updatedEvent);
    }

    @Operation(summary = "이벤트 삭제 API")
    @DeleteMapping("/events/{eventId}")
    public ResponseEntity<ApiResponse> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.ok(ApiResponse.ok());
    }
}