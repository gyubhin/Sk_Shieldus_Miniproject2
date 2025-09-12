package com.csu.csu_backend.controller.dto;

import com.csu.csu_backend.entity.Category;
import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class GroupDTO {

    @Getter
    @NoArgsConstructor
    public static class CreateGroupRequest {
        @NotBlank(message = "그룹명은 필수입니다.")
        private String name;
        private String description;
        private String region;
        private int maxMembers;
        private String imageUrl;
        private String tags;

        @NotNull(message = "카테고리는 필수입니다.")
        private Long categoryId;

        public Group toEntity(User owner, Category category) {
            return Group.builder()
                    .name(name)
                    .description(description)
                    .region(region)
                    .maxMembers(maxMembers)
                    .imageUrl(imageUrl)
                    .tags(tags)
                    .owner(owner)
                    .category(category)
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class GroupResponse {
        private Long id;
        private String name;
        private String description;
        private String region;
        private int maxMembers;
        private int currentMembers;
        private String imageUrl;
        private String tags;
        private boolean isLiked;
        private boolean isJoined; // 추가
        private Long ownerId;
        private String ownerNickname;
        private Long categoryId;
        private String categoryName;

        public GroupResponse(Group group) {
            this.id = group.getId();
            this.name = group.getName();
            this.description = group.getDescription();
            this.region = group.getRegion();
            this.maxMembers = group.getMaxMembers();
            this.currentMembers = group.getCurrentMembers();
            this.imageUrl = group.getImageUrl();
            this.tags = group.getTags();
            this.isLiked = false; // 기본값, 서비스 레이어에서 최종 결정
            this.isJoined = false; // 기본값, 서비스 레이어에서 최종 결정
            this.ownerId = group.getOwner().getId();
            this.ownerNickname = group.getOwner().getNickname();
            this.categoryId = group.getCategory().getId();
            this.categoryName = group.getCategory().getName();
        }
    }
}