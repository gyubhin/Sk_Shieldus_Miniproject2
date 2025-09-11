package com.csu.csu_backend.service;

import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.exception.ResourceNotFoundException;
import com.csu.csu_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    /**
     * 사용자를 논리적으로 삭제합니다.
     * 사용자가 그룹장으로 있는 그룹이 하나라도 있으면 탈퇴가 거부됩니다.
     * @param userId 탈퇴할 사용자의 ID
     */
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        // 사용자가 소유한 그룹이 있는지 확인합니다.
        if (!user.getOwnedGroups().isEmpty()) {
            // isPresent() 체크는 @Where(clause = "deleted_at IS NULL") 때문에 필요합니다.
            boolean hasActiveOwnedGroups = user.getOwnedGroups().stream().anyMatch(group -> group.getDeletedAt() == null);
            if (hasActiveOwnedGroups) {
                throw new IllegalStateException("소유하고 있는 그룹이 있어 탈퇴할 수 없습니다. 그룹장 위임 후 다시 시도해주세요.");
            }
        }

        user.delete();
    }
}