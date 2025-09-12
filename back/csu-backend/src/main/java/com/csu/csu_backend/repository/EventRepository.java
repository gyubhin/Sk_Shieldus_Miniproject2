package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Event;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    Page<Event> findByGroupId(Long groupId, Pageable pageable);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT e FROM Event e WHERE e.id = :eventId")
    Optional<Event> findByIdWithLock(@Param("eventId") Long eventId);

    // --- 아래 메서드를 새로 추가 ---
    /**
     * 특정 사용자가 참석하고 아직 시작되지 않은 모든 이벤트를 조회합니다.
     * @param userId 사용자의 ID
     * @param now 현재 시간
     * @return 다가오는 이벤트 목록
     */
    @Query("SELECT e FROM Event e JOIN e.attendees a WHERE a.user.id = :userId AND e.startAt > :now ORDER BY e.startAt ASC")
    List<Event> findUpcomingEventsByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);
}