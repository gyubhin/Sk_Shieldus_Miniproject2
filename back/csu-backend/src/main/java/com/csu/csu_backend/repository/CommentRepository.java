package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Comment;
import com.csu.csu_backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
    void deleteByPost(Post post);
}
