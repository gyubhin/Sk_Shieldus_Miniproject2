package com.csu.csu_backend.controller.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiResponse {
    private boolean success;

    public static ApiResponse ok() {
        return new ApiResponse(true);
    }
}
