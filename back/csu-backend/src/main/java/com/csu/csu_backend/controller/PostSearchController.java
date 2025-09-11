package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.PostDTO.PostResponse;
import com.csu.csu_backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostSearchController {

    private final PostService postService;

    /**
     * 전체 게시글을 검색합니다. (제목 + 내용 + 작성자)
     * @param keyword 검색어
     * @param pageable 페이지네이션 정보 (예: /api/posts/search?keyword=검색어&page=0&size=10&sort=createdAt,desc)
     * @return 검색된 게시글 목록
     */
    @GetMapping("/search")
    public ResponseEntity<List<PostResponse>> searchPosts(
            @RequestParam String keyword,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        List<PostResponse> posts = postService.searchPosts(keyword, pageable);
        return ResponseEntity.ok(posts);
    }
}