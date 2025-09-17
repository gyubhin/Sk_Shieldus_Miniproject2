package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.CategoryDTO.CategoryResponse;
import com.csu.csu_backend.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    /*
     * 아래 '/with-groups' API는 GET /api/groups?categoryId={id} API와 기능이 중복되고
     * 페이징 기준이 카테고리이므로 오해의 소지가 있어 사용하지 않는 것을 권장합니다.
     * 그룹 조회는 /api/groups 엔드포인트를 사용해 주세요.
     *
    @Operation(summary = "각 카테고리 별 그룹 목록 포함, 전체 목록 조회 API (사용 비권장)")
    @GetMapping("/with-groups")
    public ResponseEntity<PagingResponse<CategoryWithGroupsResponse>> getAllCategoriesWithGroups(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PageableDefault(size = 5) Pageable pageable) {

        Long userId = (currentUser != null) ? currentUser.getId() : null;
        PagingResponse<CategoryWithGroupsResponse> categoriesWithGroups = categoryService.getAllCategoriesWithGroups(userId, pageable);
        return ResponseEntity.ok(categoriesWithGroups);
    }
    */
}