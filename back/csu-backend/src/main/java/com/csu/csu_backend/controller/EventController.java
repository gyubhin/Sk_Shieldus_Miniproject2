package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.EventRequest;
import com.csu.csu_backend.controller.dto.EventResponse;
import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.controller.dto.Response.PagingResponse;
import com.csu.csu_backend.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping("/groups/{groupId}/events")
    public ResponseEntity<Void> createEvent(@PathVariable Long groupId, @Valid @RequestBody EventRequest request) {
        // TODO: Get user ID from security context
        Long currentUserId = 1L; // Placeholder
        Long eventId = eventService.createEvent(groupId, request, currentUserId);
        return ResponseEntity.created(URI.create("/api/events/" + eventId)).build();
    }

    @GetMapping("/groups/{groupId}/events")
    public ResponseEntity<PagingResponse<EventResponse>> getEvents(
            @PathVariable Long groupId,
            @PageableDefault(sort = "startAt", direction = Sort.Direction.DESC) Pageable pageable) {
        PagingResponse<EventResponse> events = eventService.getEventsByGroup(groupId, pageable);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/events/{eventId}")
    public ResponseEntity<EventResponse> getEvent(@PathVariable Long eventId) {
        EventResponse event = eventService.getEvent(eventId);
        return ResponseEntity.ok(event);
    }

    @PatchMapping("/events/{eventId}")
    public ResponseEntity<EventResponse> updateEvent(@PathVariable Long eventId, @Valid @RequestBody EventRequest request) {
        EventResponse updatedEvent = eventService.updateEvent(eventId, request);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/events/{eventId}")
    public ResponseEntity<ApiResponse> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.ok(ApiResponse.ok());
    }
}