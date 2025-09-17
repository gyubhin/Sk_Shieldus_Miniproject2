package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.EventAttendee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventAttendeeRepository extends JpaRepository<EventAttendee, Long> {

    List<EventAttendee> findByEventId(Long eventId);

    Optional<EventAttendee> findByEventIdAndUserId(Long eventId, Long userId);

    // 대기자 중 가장 오래된 사람 찾기
    Optional<EventAttendee> findFirstByEventIdAndStatusOrderByCreatedAtAsc(Long eventId, String status);

    long countByEventIdAndStatus(Long eventId, String status);
}
