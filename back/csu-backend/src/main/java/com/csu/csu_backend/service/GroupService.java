package com.csu.csu_backend.service;

import com.csu.csu_backend.controller.dto.GroupDTO.CreateGroupRequest;
import com.csu.csu_backend.controller.dto.GroupDTO.GroupResponse;
import com.csu.csu_backend.controller.dto.MembershipDTO.MemberResponse;
import com.csu.csu_backend.entity.Category;
import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.Membership;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.exception.DuplicateResourceException;
import com.csu.csu_backend.exception.ResourceNotFoundException;
import com.csu.csu_backend.exception.UnauthorizedException;
import com.csu.csu_backend.repository.CategoryRepository;
import com.csu.csu_backend.repository.GroupRepository;
import com.csu.csu_backend.repository.MembershipRepository;
import com.csu.csu_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GroupService {

    private static final String ROLE_OWNER = "OWNER";
    private static final String ROLE_MEMBER = "MEMBER";

    private final GroupRepository groupRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;

    @Transactional
    public Long createGroup(CreateGroupRequest request, Long ownerId) {
        User owner = findUserById(ownerId);
        Category category = findCategoryById(request.getCategoryId());
        validateGroupNameDuplication(request.getName());

        Group group = request.toEntity(owner, category);
        groupRepository.save(group);

        createOwnerMembership(owner, group);

        return group.getId();
    }

    // Pageable 파라미터를 받도록 수정
    public List<GroupResponse> getAllGroups(Pageable pageable) {
        Page<Group> groupPage = groupRepository.findAll(pageable);
        return groupPage.stream()
                .map(GroupResponse::new)
                .collect(Collectors.toList());
    }

    public GroupResponse getGroup(Long groupId) {
        Group group = findGroupById(groupId);
        return new GroupResponse(group);
    }

    @Transactional
    public void joinGroup(Long groupId, Long userId) {
        User user = findUserById(userId);
        Group group = findGroupById(groupId);

        validateUserIsAlreadyMember(user, group);
        validateGroupCapacity(group);

        createMemberMembership(user, group);
    }

    @Transactional
    public void leaveGroup(Long groupId, Long userId) {
        User user = findUserById(userId);
        Group group = findGroupById(groupId);

        Membership membership = findMembershipByUserAndGroup(user, group);

        validateMemberIsOwner(membership);

        membershipRepository.delete(membership);
    }

    public List<MemberResponse> getGroupMembers(Long groupId) {
        Group group = findGroupById(groupId);
        return membershipRepository.findByGroup(group).stream()
                .map(MemberResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeMember(Long groupId, Long memberId, Long ownerId) {
        if (ownerId.equals(memberId)) {
            throw new UnauthorizedException("그룹장은 자기 자신을 강퇴할 수 없습니다.");
        }

        Group group = findGroupById(groupId);
        validateUserIsOwner(group, ownerId);

        User member = findUserById(memberId);
        Membership membership = findMembershipByUserAndGroup(member, group);

        membershipRepository.delete(membership);
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("해당 ID의 사용자를 찾을 수 없습니다: " + userId));
    }

    private Group findGroupById(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("해당 ID의 그룹을 찾을 수 없습니다: " + groupId));
    }

    private Category findCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("해당 ID의 카테고리를 찾을 수 없습니다: " + categoryId));
    }

    private Membership findMembershipByUserAndGroup(User user, Group group) {
        return membershipRepository.findByUserAndGroup(user, group)
                .orElseThrow(() -> new UnauthorizedException("사용자가 해당 그룹의 멤버가 아닙니다."));
    }

    private void createOwnerMembership(User owner, Group group) {
        Membership membership = Membership.builder()
                .user(owner)
                .group(group)
                .role(ROLE_OWNER)
                .build();
        membershipRepository.save(membership);
    }

    private void createMemberMembership(User user, Group group) {
        Membership membership = Membership.builder()
                .user(user)
                .group(group)
                .role(ROLE_MEMBER)
                .build();
        membershipRepository.save(membership);
    }

    private void validateGroupNameDuplication(String name) {
        groupRepository.findByName(name).ifPresent(g -> {
            throw new DuplicateResourceException("이미 존재하는 그룹 이름입니다: " + name);
        });
    }

    private void validateUserIsAlreadyMember(User user, Group group) {
        if (membershipRepository.existsByUserAndGroup(user, group)) {
            throw new DuplicateResourceException("이미 가입된 그룹입니다.");
        }
    }

    private void validateGroupCapacity(Group group) {
        long currentMembers = membershipRepository.countByGroup(group);
        if (currentMembers >= group.getMaxMembers()) {
            throw new IllegalStateException("그룹 정원이 모두 찼습니다.");
        }
    }

    private void validateMemberIsOwner(Membership membership) {
        if (ROLE_OWNER.equals(membership.getRole())) {
            throw new UnauthorizedException("그룹장은 그룹을 탈퇴할 수 없습니다.");
        }
    }

    private void validateUserIsOwner(Group group, Long userId) {
        if (!group.getOwner().getId().equals(userId)) {
            throw new UnauthorizedException("그룹장만 해당 작업을 수행할 수 있습니다.");
        }
    }
}

