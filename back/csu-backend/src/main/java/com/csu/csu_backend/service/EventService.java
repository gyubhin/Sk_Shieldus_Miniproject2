package com.csu.csu_backend.service;

import com.csu.csu_backend.dto.EventRequest;
import com.csu.csu_backend.dto.EventResponse;
import com.csu.csu_backend.entity.Event;
import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.repository.EventRepository;
import com.csu.csu_backend.repository.GroupRepository;
import com.csu.csu_backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // 이벤트 생성
    public Long createEvent(Long groupId, EventRequest request, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found with id: " + groupId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        Event event = new Event();
        event.setGroup(group);
        event.setHost(user);
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setMaxAttendees(request.getMaxAttendees());
        event.setEventDate(request.getEventDate()); // 편의 메소드 사용

        Event savedEvent = eventRepository.save(event);

        eventAttendeeService.addHostAttendee(savedEvent, user);

        return savedEvent.getId();
    }

    // 그룹의 모든 이벤트 조회
    @Transactional(readOnly = true)
    public List<EventResponse> getEventsByGroup(Long groupId) {
        List<Event> events = eventRepository.findByGroupId(groupId);
        return events.stream().map(this::mapToEventResponse).collect(Collectors.toList());
    }

    // 특정 이벤트 상세 조회
    @Transactional(readOnly = true)
    public EventResponse getEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));
        return mapToEventResponse(event);
    }

    // 이벤트 수정
    public EventResponse updateEvent(Long eventId, EventRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setMaxAttendees(request.getMaxAttendees());
        event.setEventDate(request.getEventDate()); // 편의 메소드 사용

        Event updatedEvent = eventRepository.save(event);
        return mapToEventResponse(updatedEvent);
    }

    // 이벤트 삭제
    public void deleteEvent(Long eventId) {
        if (!eventRepository.existsById(eventId)) {
            throw new EntityNotFoundException("Event not found with id: " + eventId);
        }
        eventRepository.deleteById(eventId);
    }

    // --- Helper Method for DTO mapping ---
    private EventResponse mapToEventResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .eventDate(event.getStartAt())
                .maxAttendees(event.getMaxAttendees())
                .groupId(event.getGroup().getId())
                .hostId(event.getHost().getId())
                .build();
    }
}
