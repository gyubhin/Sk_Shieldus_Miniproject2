package com.csu.csu_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class GroupFullException extends RuntimeException {

    public GroupFullException(String message) {
        super(message);
    }
}