package com.csu.csu_backend.controller.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CursorPagingResponse<T> {
    private List<T> content;
    private String nextCursor;    // 마지막 데이터의 createdAt
    private boolean hasNext;      // 다음 페이지 있는지 여부
}
