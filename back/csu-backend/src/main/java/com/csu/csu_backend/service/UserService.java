package com.csu.csu_backend.service;

import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.exception.ResourceNotFoundException;
import com.csu.csu_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        if (!user.getOwnedGroups().isEmpty()) {
            boolean hasActiveOwnedGroups = user.getOwnedGroups().stream().anyMatch(group -> group.getDeletedAt() == null);
            if (hasActiveOwnedGroups) {
                throw new IllegalStateException("소유하고 있는 그룹이 있어 탈퇴할 수 없습니다. 그룹장 위임 후 다시 시도해주세요.");
            }
        }

        user.delete();
    }

    @Transactional
    public String updateProfileImage(Long userId, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));


        fileStorageService.deleteFile(user.getProfileImageUrl());


        String path = fileStorageService.saveFile(file, "users");
        user.setProfileImageUrl(path);

        userRepository.save(user);
        return path;
    }

    @Transactional
    public void deleteProfileImage(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        fileStorageService.deleteFile(user.getProfileImageUrl());
        user.setProfileImageUrl(null);

        userRepository.save(user);
    }

}