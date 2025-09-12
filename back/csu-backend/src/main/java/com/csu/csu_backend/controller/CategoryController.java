package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryResponse;
import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryWithGroupsResponse;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/with-groups")
    public ResponseEntity<List<CategoryWithGroupsResponse>> getAllCategoriesWithGroups(
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Long userId = (currentUser != null) ? currentUser.getId() : null;
        List<CategoryWithGroupsResponse> categoriesWithGroups = categoryService.getAllCategoriesWithGroups(userId);
        return ResponseEntity.ok(categoriesWithGroups);
    }
}