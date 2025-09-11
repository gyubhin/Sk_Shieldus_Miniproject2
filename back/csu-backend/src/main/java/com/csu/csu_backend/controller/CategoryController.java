package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryResponse;
import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryWithGroupsResponse; // 추가
import com.csu.csu_backend.service.CategoryService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * 단순 카테고리 이름 목록만 조회합니다.
     */
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    /**
     * 각 카테고리별로 그룹 목록을 포함하여 전체 목록을 조회합니다.
     */
    @GetMapping("/with-groups")
    public ResponseEntity<List<CategoryWithGroupsResponse>> getAllCategoriesWithGroups() {
        List<CategoryWithGroupsResponse> categoriesWithGroups = categoryService.getAllCategoriesWithGroups();
        return ResponseEntity.ok(categoriesWithGroups);
    }
}