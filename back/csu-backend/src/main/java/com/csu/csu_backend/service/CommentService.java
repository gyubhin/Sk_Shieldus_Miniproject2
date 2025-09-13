package com.csu.csu_backend.service;

import com.csu.csu_backend.controller.dto.CommentDTO;
import com.csu.csu_backend.controller.dto.CommentDTO.CreateCommentRequest;
import com.csu.csu_backend.controller.dto.CommentDTO.UpdateCommentRequest;
import com.csu.csu_backend.entity.Comment;
import com.csu.csu_backend.entity.Post;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.exception.ResourceNotFoundException;
import com.csu.csu_backend.exception.UnauthorizedException;
import com.csu.csu_backend.repository.CommentRepository;
import com.csu.csu_backend.repository.PostRepository;
import com.csu.csu_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Transactional
    public Long createComment(Long postId, Long userId, CreateCommentRequest request) {
        User user = findUserById(userId);
        Post post = findPostById(postId);

        Comment parentComment = null;
        if (request.getParentId() != null) {
            parentComment = findCommentById(request.getParentId());
        }

        Comment comment = Comment.builder()
                .content(request.getContent())
                .user(user)
                .post(post)
                .parent(parentComment)
                .build();

        return commentRepository.save(comment).getId();
    }

    @Transactional
    public void updateComment(Long commentId, Long userId, UpdateCommentRequest request) {
        Comment comment = findCommentById(commentId);
        validateCommentOwner(comment, userId);
        comment.update(request.getContent());
    }

    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        Comment comment = findCommentById(commentId);
        validateCommentOwner(comment, userId);
        comment.delete();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
    }

    private Post findPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다."));
    }

    private Comment findCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("댓글을 찾을 수 없습니다."));
    }

    private void validateCommentOwner(Comment comment, Long userId) {
        if (!comment.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("댓글 수정/삭제 권한이 없습니다.");
        }
    }

    public List<CommentDTO.CommentResponse> getComments(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

        List<Comment> allComments = commentRepository.findByPostOrderByCreatedAtAsc(post);

        // 최상위 댓글만 필터링
        List<Comment> topLevel = allComments.stream()
                .filter(c -> c.getParent() == null)
                .toList();

        // flatten된 children 세팅
        return topLevel.stream()
                .map(parent -> {
                    CommentDTO.CommentResponse dto = new CommentDTO.CommentResponse(parent);
                    List<CommentDTO.CommentResponse> replies = allComments.stream()
                            .filter(c -> c.getParent() != null && getTopParent(c).equals(parent))
                            .map(CommentDTO.CommentResponse::new)
                            .toList();
                    dto.setChildren(replies);
                    return dto;
                })
                .toList();
    }

    private Comment getTopParent(Comment c) {
        while (c.getParent() != null) {
            c = c.getParent();
        }
        return c;
    }
}
