package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.Category;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class CategoryDTO {

    @Getter
    @NoArgsConstructor
    public static class CategoryResponse {
        private Long id;
        private String name;

        public CategoryResponse(Category category) {
            this.id = category.getId();
            this.name = category.getName();
        }
    }
}