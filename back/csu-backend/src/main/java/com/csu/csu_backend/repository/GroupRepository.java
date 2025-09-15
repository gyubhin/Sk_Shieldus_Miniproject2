package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Group;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Long>, JpaSpecificationExecutor<Group> {
    Optional<Group> findByName(String name);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT g FROM Group g WHERE g.name = :name")
    Optional<Group> findByNameWithLock(@Param("name") String name);

    /**
     * 그룹을 이름, 설명, 태그로 검색합니다.
     * description 필드는 CLOB 타입이므로 LOWER() 함수 적용을 제외합니다.
     * @param keyword 검색어
     * @param pageable 페이징 정보
     * @return 검색된 그룹 페이지
     */
    @Query("SELECT g FROM Group g WHERE " +
            "LOWER(g.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "g.description LIKE CONCAT('%', :keyword, '%') OR " + // LOWER() 제거
            "LOWER(g.tags) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Group> search(@Param("keyword") String keyword, Pageable pageable);
}