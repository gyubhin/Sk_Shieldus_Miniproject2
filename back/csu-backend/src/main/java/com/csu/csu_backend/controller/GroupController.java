package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.GroupDTO.*;
import com.csu.csu_backend.controller.dto.MembershipDTO.MemberResponse;
import com.csu.csu_backend.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Void> createGroup(@Valid @RequestBody CreateGroupRequest request) {
        // TODO: 현재는 ownerId를 1L로 하드코딩. 추후 인증 기능 구현 후 토큰에서 ID 추출
        Long ownerId = 1L;
        Long groupId = groupService.createGroup(request, ownerId);
        return ResponseEntity.created(URI.create("/api/groups/" + groupId)).build();
    }

    // 페이징 파라미터를 받도록 수정
    @GetMapping
    public ResponseEntity<List<GroupResponse>> getAllGroups(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(groupService.getAllGroups(pageable));
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupResponse> getGroup(@PathVariable Long groupId) {
        return ResponseEntity.ok(groupService.getGroup(groupId));
    }

    // 4. 멤버십 API
    @PostMapping("/{groupId}/join")
    public ResponseEntity<String> joinGroup(@PathVariable Long groupId) {
        // TODO: 현재는 userId를 2L로 하드코딩. 추후 인증 기능 구현 후 토큰에서 ID 추출
        Long userId = 2L;
        groupService.joinGroup(groupId, userId);
        return ResponseEntity.ok("가입 신청이 완료되었습니다.");
    }

    @DeleteMapping("/{groupId}/leave")
    public ResponseEntity<Void> leaveGroup(@PathVariable Long groupId) {
        // TODO: userId 추출
        Long userId = 2L;
        groupService.leaveGroup(groupId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{groupId}/members")
    public ResponseEntity<List<MemberResponse>> getGroupMembers(@PathVariable Long groupId) {
        return ResponseEntity.ok(groupService.getGroupMembers(groupId));
    }

    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<Void> removeMember(@PathVariable Long groupId, @PathVariable Long userId) {
        // TODO: ownerId 추출
        Long ownerId = 1L;
        groupService.removeMember(groupId, userId, ownerId);
        return ResponseEntity.noContent().build();
    }
}

