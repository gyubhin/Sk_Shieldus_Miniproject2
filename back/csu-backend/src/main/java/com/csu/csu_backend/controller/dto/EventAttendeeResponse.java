package com.csu.csu_backend.controller.dto;

public class EventAttendeeResponse {

    private Long userId;
    private String username;
    private String status;
    private String role;

    // Private constructor for the builder
    private EventAttendeeResponse(Long userId, String username, String status, String role) {
        this.userId = userId;
        this.username = username;
        this.status = status;
        this.role = role;
    }

    // --- Manual Getters ---
    public Long getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getStatus() { return status; }
    public String getRole() { return role; }

    // --- Manual Builder ---
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long userId;
        private String username;
        private String status;
        private String role;

        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public Builder role(String role) {
            this.role = role;
            return this;
        }

        public EventAttendeeResponse build() {
            return new EventAttendeeResponse(userId, username, status, role);
        }
    }
}
