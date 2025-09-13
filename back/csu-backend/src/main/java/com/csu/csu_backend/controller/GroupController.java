package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.GroupDTO.CreateGroupRequest;
import com.csu.csu_backend.controller.dto.GroupDTO.GroupResponse;
import com.csu.csu_backend.controller.dto.MembershipDTO.MemberResponse;
import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.controller.dto.Response.PagingResponse;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.GroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Tag(name = "그룹(모임) API", description = "그룹 CRUD API")
@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @Operation(summary = "그룹 생성 API")
    @PostMapping
    public ResponseEntity<Void> createGroup(@Valid @RequestBody CreateGroupRequest request,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long ownerId = currentUser.getId();
        Long groupId = groupService.createGroup(request, ownerId);
        return ResponseEntity.created(URI.create("/api/groups/" + groupId)).build();
    }

    @Operation(summary = "그룹 검색 API")
    @GetMapping
    public ResponseEntity<PagingResponse<GroupResponse>> getAllGroups(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String region,
            @RequestParam(name = "sort", required = false, defaultValue = "latest") String sort,
            @PageableDefault(size = 20) Pageable pageable,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Pageable finalPageable;
        if ("name".equals(sort)) {
            finalPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("name"));
        } else { // "latest" or any other value
            finalPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdAt").descending());
        }

        Long userId = (currentUser != null) ? currentUser.getId() : null;
        PagingResponse<GroupResponse> groups = groupService.getAllGroups(categoryId, region, finalPageable, userId);
        return ResponseEntity.ok(groups);
    }

    @Operation(summary = "그룹 상세 조회 API")
    @GetMapping("/{groupId}")
    public ResponseEntity<GroupResponse> getGroup(@PathVariable Long groupId,
                                                  @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = (currentUser != null) ? currentUser.getId() : null;
        GroupResponse group = groupService.getGroup(groupId, userId);
        return ResponseEntity.ok(group);
    }

    @Operation(summary = "내가 가입한 그룹 조회 API")
    @GetMapping("/my")
    public ResponseEntity<List<GroupResponse>> getMyGroups(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        List<GroupResponse> myGroups = groupService.getMyGroups(userId);
        return ResponseEntity.ok(myGroups);
    }

    @Operation(summary = "그룹 멤버 목록 조회 API")
    @GetMapping("/{groupId}/members")
    public ResponseEntity<List<MemberResponse>> getGroupMembers(@PathVariable Long groupId) {
        List<MemberResponse> members = groupService.getGroupMembers(groupId);
        return ResponseEntity.ok(members);
    }

    @Operation(summary = "그룹 삭제 API")
    @DeleteMapping("/{groupId}")
    public ResponseEntity<ApiResponse> deleteGroup(@PathVariable Long groupId,
                                                   @AuthenticationPrincipal UserPrincipal currentUser) {
        groupService.deleteGroup(groupId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "모임장 위임 API")
    @PatchMapping("/{groupId}/delegate-owner/{newOwnerId}")
    public ResponseEntity<ApiResponse> delegateGroupOwner(@PathVariable Long groupId,
                                                          @PathVariable Long newOwnerId,
                                                          @AuthenticationPrincipal UserPrincipal currentUser) {
        groupService.delegateGroupOwner(groupId, newOwnerId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "그룹 가입 신청 API")
    @PostMapping("/{groupId}/join")
    public ResponseEntity<String> joinGroup(@PathVariable Long groupId,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        groupService.joinGroup(groupId, userId);
        return ResponseEntity.ok("가입 신청이 완료되었습니다.");
    }

    @Operation(summary = "그룹 탈퇴 API")
    @DeleteMapping("/{groupId}/leave")
    public ResponseEntity<ApiResponse> leaveGroup(@PathVariable Long groupId,
                                                  @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        groupService.leaveGroup(groupId, userId);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "그룹 멤버 강퇴(모임장) API")
    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<ApiResponse> removeMember(@PathVariable Long groupId, @PathVariable Long userId,
                                                    @AuthenticationPrincipal UserPrincipal currentUser) {
        Long ownerId = currentUser.getId();
        groupService.removeMember(groupId, userId, ownerId);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "그룹 커버 이미지 업로드/수정 API")
    @PostMapping("/{groupId}/cover-image")
    public ResponseEntity<String> uploadCoverImage(@PathVariable Long groupId,
                                                   @RequestParam("file") MultipartFile file) {
        String path = groupService.updateCoverImage(groupId, file);
        return ResponseEntity.ok(path);
    }

    @Operation(summary = "그룹 커버 이미지 삭제 API")
    @DeleteMapping("/{groupId}/cover-image")
    public ResponseEntity<ApiResponse> deleteCoverImage(@PathVariable Long groupId,
                                                        @AuthenticationPrincipal UserPrincipal currentUser) {
        groupService.deleteCoverImage(groupId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @Operation(summary = "그룹 찜하기/찜 취소 API")
    @PostMapping("/{groupId}/like")
    public ResponseEntity<Map<String, Boolean>> toggleGroupLike(@PathVariable Long groupId,
                                                                @AuthenticationPrincipal UserPrincipal currentUser) {
        boolean isLiked = groupService.toggleGroupLike(groupId, currentUser.getId());
        return ResponseEntity.ok(Map.of("liked", isLiked));
    }
}