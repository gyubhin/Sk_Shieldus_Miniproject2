package com.csu.csu_backend.controller;

import com.csu.csu_backend.dto.EventRequest;
import com.csu.csu_backend.dto.EventResponse;
import com.csu.csu_backend.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping("/groups/{groupId}/events")
    public ResponseEntity<Void> createEvent(@PathVariable Long groupId, @Valid @RequestBody EventRequest request) {
        // TODO: Get user ID from security context
        Long currentUserId = 1L; // Placeholder for the current user's ID.
        Long eventId = eventService.createEvent(groupId, request, currentUserId);
        return ResponseEntity.created(URI.create("/api/events/" + eventId)).build();
    }

    @GetMapping("/groups/{groupId}/events")
    public ResponseEntity<List<EventResponse>> getEvents(@PathVariable Long groupId) {
        List<EventResponse> events = eventService.getEventsByGroup(groupId);
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
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.noContent().build();
    }
}
