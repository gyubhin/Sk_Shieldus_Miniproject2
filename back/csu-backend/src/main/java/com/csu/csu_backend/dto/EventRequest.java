package com.csu.csu_backend.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class EventRequest {

    @NotBlank(message = "이벤트 제목은 필수입니다.")
    private String title;

    private String description;

    @NotNull(message = "이벤트 날짜는 필수입니다.")
    @Future(message = "이벤트 날짜는 현재보다 미래여야 합니다.")
    private LocalDateTime eventDate;

    @Min(value = 2, message = "최대 참석자 수는 2명 이상이어야 합니다.")
    private int maxAttendees;

    // Getters and Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public int getMaxAttendees() {
        return maxAttendees;
    }

    public void setMaxAttendees(int maxAttendees) {
        this.maxAttendees = maxAttendees;
    }
}
