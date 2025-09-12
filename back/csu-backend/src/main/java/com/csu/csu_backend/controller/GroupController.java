package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.GroupDTO.CreateGroupRequest;
import com.csu.csu_backend.controller.dto.GroupDTO.GroupResponse;
import com.csu.csu_backend.controller.dto.MembershipDTO.MemberResponse;
import com.csu.csu_backend.controller.dto.Response.ApiResponse;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.GroupService;
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

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<Void> createGroup(@Valid @RequestBody CreateGroupRequest request,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long ownerId = currentUser.getId();
        Long groupId = groupService.createGroup(request, ownerId);
        return ResponseEntity.created(URI.create("/api/groups/" + groupId)).build();
    }

    @GetMapping
    public ResponseEntity<List<GroupResponse>> getAllGroups(
            @RequestParam(required = false) Long categoryId, // categoryId 파라미터 추가
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
        List<GroupResponse> groups = groupService.getAllGroups(categoryId, region, finalPageable, userId); // 서비스에 categoryId 전달
        return ResponseEntity.ok(groups);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupResponse> getGroup(@PathVariable Long groupId) {
        GroupResponse group = groupService.getGroup(groupId);
        return ResponseEntity.ok(group);
    }

    @GetMapping("/my")
    public ResponseEntity<List<GroupResponse>> getMyGroups(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        List<GroupResponse> myGroups = groupService.getMyGroups(userId);
        return ResponseEntity.ok(myGroups);
    }

    @GetMapping("/{groupId}/members")
    public ResponseEntity<List<MemberResponse>> getGroupMembers(@PathVariable Long groupId) {
        List<MemberResponse> members = groupService.getGroupMembers(groupId);
        return ResponseEntity.ok(members);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<ApiResponse> deleteGroup(@PathVariable Long groupId,
                                                   @AuthenticationPrincipal UserPrincipal currentUser) {
        groupService.deleteGroup(groupId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @PatchMapping("/{groupId}/delegate-owner/{newOwnerId}")
    public ResponseEntity<ApiResponse> delegateGroupOwner(@PathVariable Long groupId,
                                                          @PathVariable Long newOwnerId,
                                                          @AuthenticationPrincipal UserPrincipal currentUser) {
        groupService.delegateGroupOwner(groupId, newOwnerId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @PostMapping("/{groupId}/join")
    public ResponseEntity<String> joinGroup(@PathVariable Long groupId,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        groupService.joinGroup(groupId, userId);
        return ResponseEntity.ok("가입 신청이 완료되었습니다.");
    }

    @DeleteMapping("/{groupId}/leave")
    public ResponseEntity<ApiResponse> leaveGroup(@PathVariable Long groupId,
                                                  @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        groupService.leaveGroup(groupId, userId);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<ApiResponse> removeMember(@PathVariable Long groupId, @PathVariable Long userId,
                                                    @AuthenticationPrincipal UserPrincipal currentUser) {
        Long ownerId = currentUser.getId();
        groupService.removeMember(groupId, userId, ownerId);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @PostMapping("/{groupid}/cover-image")
    public ResponseEntity<String> uploadCoverImage(@PathVariable Long id,
                                                   @RequestParam("file") MultipartFile file) {
        String path = groupService.updateCoverImage(id, file);
        return ResponseEntity.ok(path);
    }

    @DeleteMapping("/{groupId}/cover-image")
    public ResponseEntity<ApiResponse> deleteCoverImage(@PathVariable Long groupId,
                                                        @AuthenticationPrincipal UserPrincipal currentUser) {
        groupService.deleteCoverImage(groupId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok());
    }
}