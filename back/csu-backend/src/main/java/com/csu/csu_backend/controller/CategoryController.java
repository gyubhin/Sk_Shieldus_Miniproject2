package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryResponse;
import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryWithGroupsResponse;
import com.csu.csu_backend.controller.dto.Response.PagingResponse;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "카테고리 API", description = "카테고리 CRUD API")
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * 단순 카테고리 이름 목록만 조회합니다.
     */
    @Operation(summary = "단순 카테고리 이름 목록 조회 API")
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    /**
     * 각 카테고리별로 그룹 목록을 포함하여 전체 목록을 조회합니다.
     */
    @Operation(summary = "각 카테고리 별 그룹 목록 포함, 전체 목록 조회 API (페이징)")
    @GetMapping("/with-groups")
    public ResponseEntity<PagingResponse<CategoryWithGroupsResponse>> getAllCategoriesWithGroups(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PageableDefault(size = 5) Pageable pageable) {

        Long userId = (currentUser != null) ? currentUser.getId() : null;
        PagingResponse<CategoryWithGroupsResponse> categoriesWithGroups = categoryService.getAllCategoriesWithGroups(userId, pageable);
        return ResponseEntity.ok(categoriesWithGroups);
    }
}