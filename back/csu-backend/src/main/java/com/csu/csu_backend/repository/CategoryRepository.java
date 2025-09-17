package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    /**
     * 모든 카테고리를 조회하되, 각 카테고리에 속한 그룹 목록을 Fetch Join으로 함께 가져옴.
     * N+1 문제를 해결하기 위함
     * @return 카테고리와 그룹 정보가 모두 포함된 리스트
     */
    @Query("SELECT DISTINCT c FROM Category c LEFT JOIN FETCH c.groups")
    List<Category> findAllWithGroups();

    /**
     * 모든 카테고리를 페이징 처리하여 조회합니다. (그룹 목록 포함)
     * Fetch Join과 페이징을 함께 사용할 때 발생할 수 있는 count 쿼리 문제를 해결하기 위해
     * 별도의 countQuery를 지정합니다.
     * @param pageable 페이징 정보
     * @return 페이징 처리된 카테고리와 그룹 정보
     */
    @Query(value = "SELECT DISTINCT c FROM Category c LEFT JOIN FETCH c.groups",
            countQuery = "SELECT count(c) FROM Category c")
    Page<Category> findAllWithGroups(Pageable pageable);
}