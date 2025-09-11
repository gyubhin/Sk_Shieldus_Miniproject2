package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByGroup(Group group, Pageable pageable);
    Optional<Post> findByIdAndGroup(Long id, Group group);
}
