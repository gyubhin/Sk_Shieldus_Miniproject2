package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Comment;
import com.csu.csu_backend.entity.Post;
import com.csu.csu_backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
    void deleteByPost(Post post);

    // 특정 게시글의 모든 댓글 + 답글 (작성 시간순)
    List<Comment> findByPostOrderByCreatedAtAsc(Post post);

    long countByUserId(Long userId);

    Page<Comment> findByUser(User user, Pageable pageable);
}