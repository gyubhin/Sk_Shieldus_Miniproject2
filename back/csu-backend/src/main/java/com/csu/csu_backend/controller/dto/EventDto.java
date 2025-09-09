package com.csu.csu_backend.controller.dto;

import java.time.LocalDateTime;
import java.util.List;

public class EventDTO {
    private Long id;
    private String title;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Long hostId;        // User 엔티티의 id
    private Long groupId;       // Group 엔티티의 id

    // 참석자 목록
    private List<EventAttendeeDTO> attendees;
}