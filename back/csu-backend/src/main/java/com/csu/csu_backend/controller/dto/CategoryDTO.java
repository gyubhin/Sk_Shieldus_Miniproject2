package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
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

        public CategoryWithGroupsResponse(Category category, Set<Long> likedGroupIds, Set<Long> joinedGroupIds) {
            this.id = category.getId();
            this.name = category.getName();
            this.groups = category.getGroups().stream()
                    .map(group -> {
                        GroupDTO.GroupResponse response = new GroupDTO.GroupResponse(group);
                        response.setLiked(likedGroupIds.contains(group.getId()));
                        response.setJoined(joinedGroupIds.contains(group.getId()));
                        return response;
                    })
                    .collect(Collectors.toList());
        }
    }
}