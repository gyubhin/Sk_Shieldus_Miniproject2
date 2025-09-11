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

    /**
     * 신규 그룹을 생성합니다.
     * @param request 그룹 생성에 필요한 정보 (이름, 설명, 카테고리 ID 등)
     * @param currentUser 현재 인증된 사용자 정보
     * @return 생성된 그룹의 URI를 포함한 201 Created 응답
     */
    @PostMapping
    public ResponseEntity<Void> createGroup(@Valid @RequestBody CreateGroupRequest request,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long ownerId = currentUser.getId();
        Long groupId = groupService.createGroup(request, ownerId);
        return ResponseEntity.created(URI.create("/api/groups/" + groupId)).build();
    }

    /**
     * 전체 그룹 목록을 페이지네이션하여 조회합니다.
     * @param pageable 페이지 정보 (페이지 번호, 사이즈, 정렬)
     * @return 그룹 목록을 포함한 200 OK 응답
     */
    @GetMapping
    public ResponseEntity<List<GroupResponse>> getAllGroups(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        List<GroupResponse> groups = groupService.getAllGroups(pageable);
        return ResponseEntity.ok(groups);
    }

    /**
     * 특정 그룹의 상세 정보를 조회합니다.
     * @param groupId 조회할 그룹의 ID
     * @return 그룹 상세 정보를 포함한 200 OK 응답
     */
    @GetMapping("/{groupId}")
    public ResponseEntity<GroupResponse> getGroup(@PathVariable Long groupId) {
        GroupResponse group = groupService.getGroup(groupId);
        return ResponseEntity.ok(group);
    }

    /**
     * 특정 그룹에 가입을 신청합니다.
     * @param groupId 가입할 그룹의 ID
     * @param currentUser 현재 인증된 사용자 정보
     * @return 성공 메시지를 포함한 200 OK 응답
     */
    @PostMapping("/{groupId}/join")
    public ResponseEntity<String> joinGroup(@PathVariable Long groupId,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        groupService.joinGroup(groupId, userId);
        return ResponseEntity.ok("가입 신청이 완료되었습니다.");
    }

    /**
     * 가입한 그룹에서 탈퇴합니다.
     * @param groupId 탈퇴할 그룹의 ID
     * @param currentUser 현재 인증된 사용자 정보
     * @return 내용 없음을 의미하는 204 No Content 응답
     */
    @DeleteMapping("/{groupId}/leave")
    public ResponseEntity<Void> leaveGroup(@PathVariable Long groupId,
                                           @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        groupService.leaveGroup(groupId, userId);
        return ResponseEntity.noContent().build();
    }

    /**
     * (그룹장) 그룹 멤버를 강제로 탈퇴시킵니다.
     * @param groupId 현재 그룹의 ID
     * @param userId 강퇴시킬 멤버의 ID
     * @param currentUser 현재 인증된 사용자 정보 (그룹장인지 확인용)
     * @return 내용 없음을 의미하는 204 No Content 응답
     */
    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<Void> removeMember(@PathVariable Long groupId, @PathVariable Long userId,
                                             @AuthenticationPrincipal UserPrincipal currentUser) {
        Long ownerId = currentUser.getId();
        groupService.removeMember(groupId, userId, ownerId);
        return ResponseEntity.noContent().build();
    }
}