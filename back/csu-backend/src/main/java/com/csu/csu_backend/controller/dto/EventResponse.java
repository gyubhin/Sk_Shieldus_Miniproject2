package com.csu.csu_backend.controller.dto;

import java.time.LocalDateTime;

public class EventResponse {

    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String location; // location 필드 추가
    private LocalDateTime eventDate;
    private int maxAttendees;
    private long attendeesCount; // attendeesCount 필드 추가
    private Long groupId;
    private Long hostId;

    private EventResponse(Long id, String title, String description, String imageUrl, String location, LocalDateTime eventDate, int maxAttendees, long attendeesCount, Long groupId, Long hostId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.location = location;
        this.eventDate = eventDate;
        this.maxAttendees = maxAttendees;
        this.attendeesCount = attendeesCount;
        this.groupId = groupId;
        this.hostId = hostId;
    }

    // --- Manual Getters ---
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public String getLocation() { return location; }
    public LocalDateTime getEventDate() { return eventDate; }
    public int getMaxAttendees() { return maxAttendees; }
    public long getAttendeesCount() { return attendeesCount; }
    public Long getGroupId() { return groupId; }
    public Long getHostId() { return hostId; }

    // --- Manual Builder ---
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String title;
        private String description;
        private String imageUrl;
        private String location;
        private LocalDateTime eventDate;
        private int maxAttendees;
        private long attendeesCount;
        private Long groupId;
        private Long hostId;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder eventDate(LocalDateTime eventDate) { this.eventDate = eventDate; return this; }
        public Builder maxAttendees(int maxAttendees) { this.maxAttendees = maxAttendees; return this; }
        public Builder attendeesCount(long attendeesCount) { this.attendeesCount = attendeesCount; return this; }
        public Builder groupId(Long groupId) { this.groupId = groupId; return this; }
        public Builder hostId(Long hostId) { this.hostId = hostId; return this; }

        public EventResponse build() {
            return new EventResponse(id, title, description, imageUrl, location, eventDate, maxAttendees, attendeesCount, groupId, hostId);
        }
    }
}