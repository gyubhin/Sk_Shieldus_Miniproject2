package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByGroup(Group group, Pageable pageable);
    Optional<Post> findByIdAndGroup(Long id, Group group);

    /**
     * 게시글을 제목, 내용, 작성자 닉네임으로 검색합니다. (JPQL LIKE 사용)
     * content 필드는 CLOB 타입이므로 LOWER() 함수 적용을 제외합니다.
     * @param keyword 검색어
     * @param pageable 페이징 정보
     * @return 검색된 게시글 페이지
     */
    @Query("SELECT p FROM Post p JOIN p.user u WHERE " +
            "LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "p.content LIKE CONCAT('%', :keyword, '%') OR " +
            "LOWER(u.nickname) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Post> search(@Param("keyword") String keyword, Pageable pageable);
}