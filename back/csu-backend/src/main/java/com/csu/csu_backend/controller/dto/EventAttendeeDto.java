package com.csu.csu_backend.controller.dto;

public class EventAttendeeDTO {
    private Long id;
    private Long eventId;     // Event 엔티티의 id
    private Long userId;      // User 엔티티의 id

    private String role;
    private String status;
}