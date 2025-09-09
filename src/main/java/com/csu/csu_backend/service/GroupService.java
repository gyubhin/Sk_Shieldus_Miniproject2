package com.csu.csu_backend.service;

import com.csu.csu_backend.controller.dto.GroupDTO.CreateGroupRequest;
import com.csu.csu_backend.controller.dto.GroupDTO.GroupResponse;
import com.csu.csu_backend.controller.dto.MembershipDTO.MemberResponse;
import com.csu.csu_backend.entity.Category;
import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.Membership;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.repository.CategoryRepository;
import com.csu.csu_backend.repository.GroupRepository;
import com.csu.csu_backend.repository.MembershipRepository;
import com.csu.csu_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
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

    public List<GroupResponse> getAllGroups() {
        return groupRepository.findAll().stream()
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
        // [추가된 부분] 강퇴 대상이 그룹장 자신인지 확인
        if (ownerId.equals(memberId)) {
            throw new IllegalStateException("Owner cannot remove themselves from the group.");
        }

        Group group = findGroupById(groupId);
        validateUserIsOwner(group, ownerId);

        User member = findUserById(memberId);
        Membership membership = findMembershipByUserAndGroup(member, group);

        membershipRepository.delete(membership);
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    private Group findGroupById(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found"));
    }

    private Category findCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
    }

    private Membership findMembershipByUserAndGroup(User user, Group group) {
        return membershipRepository.findByUserAndGroup(user, group)
                .orElseThrow(() -> new IllegalStateException("Not a member of the group"));
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
            throw new IllegalArgumentException("Group name already exists");
        });
    }

    private void validateUserIsAlreadyMember(User user, Group group) {
        if (membershipRepository.existsByUserAndGroup(user, group)) {
            throw new IllegalStateException("Already a member of the group");
        }
    }

    private void validateGroupCapacity(Group group) {
        long currentMembers = membershipRepository.countByGroup(group);
        if (currentMembers >= group.getMaxMembers()) {
            throw new IllegalStateException("Group is full");
        }
    }

    private void validateMemberIsOwner(Membership membership) {
        if (ROLE_OWNER.equals(membership.getRole())) {
            throw new IllegalStateException("Owner cannot leave the group");
        }
    }

    private void validateUserIsOwner(Group group, Long userId) {
        if (!group.getOwner().getId().equals(userId)) {
            throw new IllegalStateException("Only the owner can perform this action");
        }
    }
}