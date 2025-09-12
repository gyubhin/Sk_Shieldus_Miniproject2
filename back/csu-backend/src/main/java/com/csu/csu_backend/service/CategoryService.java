package com.csu.csu_backend.service;

import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryResponse;
import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryWithGroupsResponse;
import com.csu.csu_backend.repository.CategoryRepository;
import com.csu.csu_backend.repository.GroupLikeRepository;
import com.csu.csu_backend.repository.MembershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final GroupLikeRepository groupLikeRepository;
    private final MembershipRepository membershipRepository;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryResponse::new)
                .collect(Collectors.toList());
    }

    public List<CategoryWithGroupsResponse> getAllCategoriesWithGroups(Long userId) {
        Set<Long> likedGroupIds = (userId != null) ? groupLikeRepository.findLikedGroupIdsByUserId(userId) : Collections.emptySet();
        Set<Long> joinedGroupIds = (userId != null) ? membershipRepository.findJoinedGroupIdsByUserId(userId) : Collections.emptySet();

        return categoryRepository.findAllWithGroups().stream()
                .map(category -> new CategoryWithGroupsResponse(category, likedGroupIds, joinedGroupIds))
                .collect(Collectors.toList());
    }
}