package com.csu.csu_backend.service;

import com.csu.csu_backend.controller.dto.PostDTO.CreatePostRequest;
import com.csu.csu_backend.controller.dto.PostDTO.PostResponse;
import com.csu.csu_backend.controller.dto.PostDTO.PostDetailResponse;
import com.csu.csu_backend.controller.dto.PostDTO.UpdatePostRequest;
import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.Post;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.exception.ResourceNotFoundException;
import com.csu.csu_backend.exception.UnauthorizedException;
import com.csu.csu_backend.repository.GroupRepository;
import com.csu.csu_backend.repository.PostRepository;
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
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;

    @Transactional
    public Long createPost(Long groupId, Long userId, CreatePostRequest request) {
        User user = findUserById(userId);
        Group group = findGroupById(groupId);
        Post post = request.toEntity(user, group);
        return postRepository.save(post).getId();
    }

    public PostDetailResponse getPost(Long groupId, Long postId) {
        Group group = findGroupById(groupId);
        Post post = postRepository.findByIdAndGroup(postId, group)
                .orElseThrow(() -> new ResourceNotFoundException("해당 게시글을 찾을 수 없습니다."));
        return new PostDetailResponse(post);
    }

    public List<PostResponse> getAllPostsByGroup(Long groupId, Pageable pageable) {
        Group group = findGroupById(groupId);
        Page<Post> postsPage = postRepository.findByGroup(group, pageable);
        return postsPage.stream()
                .map(PostResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updatePost(Long groupId, Long postId, Long userId, UpdatePostRequest request) {
        Post post = findPostById(postId);
        validatePostOwner(post, userId);
        validatePostInGroup(post, groupId);
        post.update(request.getTitle(), request.getContent());
    }

    @Transactional
    public void deletePost(Long groupId, Long postId, Long userId) {
        Post post = findPostById(postId);
        validatePostOwner(post, userId);
        validatePostInGroup(post, groupId);
        post.delete();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
    }

    private Group findGroupById(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("그룹을 찾을 수 없습니다."));
    }

    private Post findPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다."));
    }

    private void validatePostOwner(Post post, Long userId) {
        if (!post.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("게시글 수정/삭제 권한이 없습니다.");
        }
    }

    private void validatePostInGroup(Post post, Long groupId) {
        if (!post.getGroup().getId().equals(groupId)) {
            throw new UnauthorizedException("해당 그룹의 게시글이 아닙니다.");
        }
    }
}
