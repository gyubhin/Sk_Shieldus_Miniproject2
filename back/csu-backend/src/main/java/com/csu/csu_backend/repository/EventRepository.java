package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByGroupId(Long groupId);
}
