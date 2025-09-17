package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.CommentDTO;
import com.csu.csu_backend.controller.dto.EventResponse;
import com.csu.csu_backend.controller.dto.GroupDTO;
import com.csu.csu_backend.controller.dto.PostDTO;
import com.csu.csu_backend.controller.dto.Response.PagingResponse;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.CommentService;
import com.csu.csu_backend.service.EventService;
import com.csu.csu_backend.service.GroupService;
import com.csu.csu_backend.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/my")
@RequiredArgsConstructor
public class MyPageController {

    private final EventService eventService;
    private final GroupService groupService;
    private final PostService postService;
    private final CommentService commentService;

    /**
     * 내가 참석하는 다가오는 정모 목록을 조회합니다.
     * @param currentUser 현재 인증된 사용자 정보
     * @return 다가오는 정모(이벤트) 목록
     */
    @GetMapping("/upcoming-events")
    public ResponseEntity<List<EventResponse>> getMyUpcomingEvents(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<EventResponse> upcomingEvents = eventService.getUpcomingEventsForUser(currentUser.getId());
        return ResponseEntity.ok(upcomingEvents);
    }

    @Operation(summary = "내가 찜한 그룹 목록 조회 API")
    @GetMapping("/liked-groups")
    public ResponseEntity<PagingResponse<GroupDTO.GroupResponse>> getMyLikedGroups(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        PagingResponse<GroupDTO.GroupResponse> likedGroups = groupService.getLikedGroups(currentUser.getId(), pageable);
        return ResponseEntity.ok(likedGroups);
    }

    @Operation(summary = "내가 작성한 게시글 목록 조회 API")
    @GetMapping("/posts")
    public ResponseEntity<PagingResponse<PostDTO.PostResponse>> getMyPosts(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        PagingResponse<PostDTO.PostResponse> myPosts = postService.getMyPosts(currentUser.getId(), pageable);
        return ResponseEntity.ok(myPosts);
    }

    @Operation(summary = "내가 작성한 댓글 목록 조회 API")
    @GetMapping("/comments")
    public ResponseEntity<PagingResponse<CommentDTO.MyCommentResponse>> getMyComments(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        PagingResponse<CommentDTO.MyCommentResponse> myComments = commentService.getMyComments(currentUser.getId(), pageable);
        return ResponseEntity.ok(myComments);
    }
}