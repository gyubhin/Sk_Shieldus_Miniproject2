package com.csu.csu_backend.service;

import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryResponse;
import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryWithGroupsResponse; // 추가
import com.csu.csu_backend.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryResponse::new)
                .collect(Collectors.toList());
    }

    // --- 아래 메서드를 새로 추가 ---
    public List<CategoryWithGroupsResponse> getAllCategoriesWithGroups() {
        return categoryRepository.findAllWithGroups().stream()
                .map(CategoryWithGroupsResponse::new)
                .collect(Collectors.toList());
    }
}