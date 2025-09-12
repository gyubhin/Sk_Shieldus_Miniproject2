package com.csu.csu_backend.controller.dto.Response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 페이징 공통 응답 dto
 * @param <T> content = List 가 들어감
 */
@Getter
@RequiredArgsConstructor
public class PagingResponse<T> {

    private final List<T> content;      // 실제 데이터 목록
    private final int totalPages;       // 전체 페이지 수
    private final long totalElements;   // 전체 데이터 개수
    private final int size;             // 페이지 크기
    private final int page;             // 현재 페이지 번호
    private final boolean last;         // 마지막 페이지 여부

    public static <T> PagingResponse<T> of(Page<T> page) {
        return new PagingResponse<>(
                page.getContent(),
                page.getTotalPages(),
                page.getTotalElements(),
                page.getSize(),
                page.getNumber(),
                page.isLast()
        );
    }
}
