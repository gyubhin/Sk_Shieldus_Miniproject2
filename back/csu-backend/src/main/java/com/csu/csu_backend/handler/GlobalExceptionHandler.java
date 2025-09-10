package com.csu.csu_backend.handler; // 이 패키지 선언과 실제 폴더 위치가 일치해야 합니다.

import com.csu.csu_backend.controller.dto.Response.ErrorResponse;
import com.csu.csu_backend.exception.DuplicateResourceException;
import com.csu.csu_backend.exception.ResourceNotFoundException;
import com.csu.csu_backend.exception.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;
import java.util.stream.Collectors;

/**
 * 모든 컨트롤러에서 발생하는 예외를 전역적으로 처리하는 핸들러입니다.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * @Valid 어노테이션을 사용한 유효성 검증 실패 시 발생하는 예외를 처리합니다.
     * @param ex 발생한 예외 객체
     * @param request 현재 요청 정보
     * @return 400 Bad Request 상태 코드와 상세한 에러 메시지를 담은 응답
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        // 어떤 필드가 어떤 이유로 실패했는지 상세한 메시지를 생성합니다.
        String detailedMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(fieldError -> String.format("'%s' 필드: %s", fieldError.getField(), fieldError.getDefaultMessage()))
                .collect(Collectors.joining(", "));

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                detailedMessage,
                request.getRequestURI()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * 요청한 리소스를 찾을 수 없을 때 발생하는 예외를 처리합니다.
     * @param ex 발생한 예외 객체
     * @param request 현재 요청 정보
     * @return 404 Not Found 상태 코드와 에러 메시지를 담은 응답
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                ex.getMessage(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    /**
     * 인증은 되었으나 해당 리소스에 대한 접근 권한이 없을 때 발생하는 예외를 처리합니다.
     * @param ex 발생한 예외 객체
     * @param request 현재 요청 정보
     * @return 403 Forbidden 상태 코드와 에러 메시지를 담은 응답
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.FORBIDDEN.value(),
                "Forbidden",
                ex.getMessage(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    /**
     * 리소스 생성 시 중복된 데이터가 존재할 때 발생하는 예외를 처리합니다.
     * @param ex 발생한 예외 객체
     * @param request 현재 요청 정보
     * @return 409 Conflict 상태 코드와 에러 메시지를 담은 응답
     */
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateResourceException(DuplicateResourceException ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.CONFLICT.value(),
                "Conflict",
                ex.getMessage(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    /**
     * 위에서 처리하지 못한 나머지 모든 예외를 처리합니다.
     * @param ex 발생한 예외 객체
     * @param request 현재 요청 정보
     * @return 500 Internal Server Error 상태 코드와 일반적인 서버 오류 메시지를 담은 응답
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, HttpServletRequest request) {
        // 실제 운영 환경에서는 로그를 남겨서 원인을 파악하는 것이 매우 중요합니다.
        // log.error("Unhandled exception occurred: {}", ex.getMessage(), ex);
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                "서버 내부에서 예상치 못한 오류가 발생했습니다. 관리자에게 문의해주세요.",
                request.getRequestURI()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


