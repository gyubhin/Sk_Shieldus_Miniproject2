package com.csu.csu_backend.service;

import com.csu.csu_backend.controller.dto.EventRequest;
import com.csu.csu_backend.controller.dto.EventResponse;
import com.csu.csu_backend.controller.dto.Response.PagingResponse;
import com.csu.csu_backend.entity.Event;
import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.repository.EventAttendeeRepository;
import com.csu.csu_backend.repository.EventRepository;
import com.csu.csu_backend.repository.GroupRepository;
import com.csu.csu_backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final EventAttendeeService eventAttendeeService;
    private final EventAttendeeRepository eventAttendeeRepository; // Repository 주입

    public Long createEvent(Long groupId, EventRequest request, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found with id: " + groupId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        Event event = Event.builder()
                .group(group)
                .host(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .location(request.getLocation()) // location 추가
                .imageUrl(request.getImageUrl())
                .maxAttendees(request.getMaxAttendees())
                .startAt(request.getEventDate())
                .endAt(request.getEventDate().plusHours(2))
                .build();
        Event savedEvent = eventRepository.save(event);

        eventAttendeeService.addHostAttendee(savedEvent, user);

        return savedEvent.getId();
    }

    @Transactional(readOnly = true)
    public PagingResponse<EventResponse> getEventsByGroup(Long groupId, Pageable pageable) {
        Page<Event> eventsPage = eventRepository.findByGroupId(groupId, pageable);
        return PagingResponse.of(eventsPage.map(this::mapToEventResponse));
    }

    @Transactional(readOnly = true)
    public EventResponse getEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));
        return mapToEventResponse(event);
    }

    @Transactional(readOnly = true)
    public List<EventResponse> getUpcomingEventsForUser(Long userId) {
        List<Event> upcomingEvents = eventRepository.findUpcomingEventsByUserId(userId, LocalDateTime.now());
        return upcomingEvents.stream()
                .map(this::mapToEventResponse)
                .collect(Collectors.toList());
    }

    public EventResponse updateEvent(Long eventId, EventRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setLocation(request.getLocation()); // location 추가
        event.setImageUrl(request.getImageUrl());
        event.setMaxAttendees(request.getMaxAttendees());
        event.setEventDate(request.getEventDate());

        Event updatedEvent = eventRepository.save(event);
        return mapToEventResponse(updatedEvent);
    }

    public void deleteEvent(Long eventId) {
        if (!eventRepository.existsById(eventId)) {
            throw new EntityNotFoundException("Event not found with id: " + eventId);
        }
        eventRepository.deleteById(eventId);
    }

    private EventResponse mapToEventResponse(Event event) {
        // 확정된(CONFIRMED) 참석자 수를 조회
        long confirmedAttendeesCount = eventAttendeeRepository.countByEventIdAndStatus(event.getId(), "CONFIRMED");

        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .imageUrl(event.getImageUrl())
                .location(event.getLocation()) // location 추가
                .eventDate(event.getStartAt())
                .maxAttendees(event.getMaxAttendees())
                .attendeesCount(confirmedAttendeesCount) // 참석자 수 추가
                .groupId(event.getGroup().getId())
                .hostId(event.getHost().getId())
                .build();
    }
}