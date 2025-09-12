package com.csu.csu_backend.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EventAttendeeResponse {

    private Long userId;
    private String username;
    private String status;
    private String role;
}
