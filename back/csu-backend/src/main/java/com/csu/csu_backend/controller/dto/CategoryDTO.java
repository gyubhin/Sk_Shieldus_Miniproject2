package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

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

    @Getter
    @NoArgsConstructor
    public static class CategoryWithGroupsResponse {
        private Long id;
        private String name;
        private List<GroupDTO.GroupResponse> groups;

        public CategoryWithGroupsResponse(Category category) {
            this.id = category.getId();
            this.name = category.getName();
            this.groups = category.getGroups().stream()
                    .map(GroupDTO.GroupResponse::new)
                    .collect(Collectors.toList());
        }
    }
}