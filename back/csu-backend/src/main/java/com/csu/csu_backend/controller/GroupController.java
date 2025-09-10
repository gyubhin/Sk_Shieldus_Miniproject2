package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.GroupDTO.*;
import com.csu.csu_backend.controller.dto.MembershipDTO.MemberResponse;
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

    // 3. 그룹 API
    @PostMapping
    public ResponseEntity<Void> createGroup(@Valid @RequestBody CreateGroupRequest request,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long ownerId = currentUser.getId();
        Long groupId = groupService.createGroup(request, ownerId);
        return ResponseEntity.created(URI.create("/api/groups/" + groupId)).build();
    }
    // ... (getAllGroups, getGroup 메서드는 수정 필요 없음)

    // 4. 멤버십 API
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

    // ... (getGroupMembers 메서드는 수정 필요 없음)

    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<Void> removeMember(@PathVariable Long groupId, @PathVariable Long userId,
                                             @AuthenticationPrincipal UserPrincipal currentUser) {
        Long ownerId = currentUser.getId();
        groupService.removeMember(groupId, userId, ownerId);
        return ResponseEntity.noContent().build();
    }
}