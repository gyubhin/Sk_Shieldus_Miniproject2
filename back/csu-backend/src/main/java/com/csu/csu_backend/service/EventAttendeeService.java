package com.csu.csu_backend.service;

import com.csu.csu_backend.controller.dto.EventAttendeeResponse;
import com.csu.csu_backend.entity.Event;
import com.csu.csu_backend.entity.EventAttendee;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.repository.EventAttendeeRepository;
import com.csu.csu_backend.repository.EventRepository;
import com.csu.csu_backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EventAttendeeService {

    private final EventAttendeeRepository eventAttendeeRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    // 이벤트 참석 신청
    public void applyToEvent(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        if (eventAttendeeRepository.findByEventIdAndUserId(eventId, userId).isPresent()) {
            throw new IllegalStateException("You have already applied to this event.");
        }

        long confirmedCount = eventAttendeeRepository.countByEventIdAndStatus(eventId, "CONFIRMED");

        EventAttendee attendee = new EventAttendee();
        attendee.setEvent(event);
        attendee.setUser(user);
        attendee.setRole("ATTENDEE");

        if (confirmedCount < event.getMaxAttendees()) {
            attendee.setStatus("CONFIRMED");
        } else {
            attendee.setStatus("WAITING");
        }
        eventAttendeeRepository.save(attendee);
    }

    // 이벤트 참석 취소
    public void cancelAttendance(Long eventId, Long userId) {
        EventAttendee attendee = eventAttendeeRepository.findByEventIdAndUserId(eventId, userId)
                .orElseThrow(() -> new EntityNotFoundException("Attendance record not found"));

        eventAttendeeRepository.delete(attendee);

        // 대기자 자동 승격 로직
        promoteNextWaitingUser(eventId);
    }

    // 이벤트 참석자 목록 조회
    @Transactional(readOnly = true)
    public List<EventAttendeeResponse> getAttendees(Long eventId) {
        List<EventAttendee> attendees = eventAttendeeRepository.findByEventId(eventId);
        return attendees.stream().map(this::mapToAttendeeResponse).collect(Collectors.toList());
    }

    // 참석 상태 변경
    public EventAttendeeResponse changeStatus(Long eventId, Long userId, String status) {
        EventAttendee attendee = eventAttendeeRepository.findByEventIdAndUserId(eventId, userId)
                .orElseThrow(() -> new EntityNotFoundException("Attendance record not found"));
        attendee.setStatus(status);
        EventAttendee updatedAttendee = eventAttendeeRepository.save(attendee);
        return mapToAttendeeResponse(updatedAttendee);
    }

    // 주최자를 참석자로 추가 (내부용)
    public void addHostAttendee(Event event, User user) {
        EventAttendee hostAttendee = new EventAttendee();
        hostAttendee.setEvent(event);
        hostAttendee.setUser(user);
        hostAttendee.setRole("HOST");
        hostAttendee.setStatus("CONFIRMED");
        eventAttendeeRepository.save(hostAttendee);
    }

    private void promoteNextWaitingUser(Long eventId) {
        eventRepository.findById(eventId).ifPresent(event -> {
            long confirmedCount = eventAttendeeRepository.countByEventIdAndStatus(eventId, "CONFIRMED");

            if (confirmedCount < event.getMaxAttendees()) {
                Optional<EventAttendee> waitingUser = eventAttendeeRepository
                        .findFirstByEventIdAndStatusOrderByCreatedAtAsc(eventId, "WAITING");

                waitingUser.ifPresent(attendee -> {
                    attendee.setStatus("CONFIRMED");
                    eventAttendeeRepository.save(attendee);
                });
            }
        });
    }

    private EventAttendeeResponse mapToAttendeeResponse(EventAttendee attendee) {
        return EventAttendeeResponse.builder()
                .userId(attendee.getUser().getId())
                .username(attendee.getUser().getUsername())
                .status(attendee.getStatus())
                .role(attendee.getRole())
                .build();
    }
}
