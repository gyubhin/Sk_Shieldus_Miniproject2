package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.GroupDTO.CreateGroupRequest;
import com.csu.csu_backend.controller.dto.GroupDTO.GroupResponse;
import com.csu.csu_backend.controller.dto.MembershipDTO.MemberResponse; // DTO 임포트 추가
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        List<GroupResponse> groups = groupService.getAllGroups(pageable, userId);
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

    /**
     * 특정 그룹의 모든 멤버 목록을 조회합니다.
     * @param groupId 조회할 그룹의 ID
     * @return 그룹 멤버 목록을 포함한 200 OK 응답
     */
    @GetMapping("/{groupId}/members")
    public ResponseEntity<List<MemberResponse>> getGroupMembers(@PathVariable Long groupId) {
        List<MemberResponse> members = groupService.getGroupMembers(groupId);
        return ResponseEntity.ok(members);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long groupId,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        groupService.deleteGroup(groupId, currentUser.getId());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{groupId}/delegate-owner/{newOwnerId}")
    public ResponseEntity<Void> delegateGroupOwner(@PathVariable Long groupId,
                                                   @PathVariable Long newOwnerId,
                                                   @AuthenticationPrincipal UserPrincipal currentUser) {
        groupService.delegateGroupOwner(groupId, newOwnerId, currentUser.getId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{groupId}/join")
    public ResponseEntity<String> joinGroup(@PathVariable Long groupId,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        groupService.joinGroup(groupId, userId);
        return ResponseEntity.ok("가입 신청이 완료되었습니다.");
    }

    @DeleteMapping("/{groupId}/leave")
    public ResponseEntity<Void> leaveGroup(@PathVariable Long groupId,
                                           @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        groupService.leaveGroup(groupId, userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<Void> removeMember(@PathVariable Long groupId, @PathVariable Long userId,
                                             @AuthenticationPrincipal UserPrincipal currentUser) {
        Long ownerId = currentUser.getId();
        groupService.removeMember(groupId, userId, ownerId);
        return ResponseEntity.noContent().build();
    }
}