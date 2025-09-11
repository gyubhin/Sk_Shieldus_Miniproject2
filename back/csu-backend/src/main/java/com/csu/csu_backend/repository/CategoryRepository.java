package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    // --- 아래 메서드를 새로 추가 ---
    /**
     * 모든 카테고리를 조회하되, 각 카테고리에 속한 그룹 목록을 Fetch Join으로 함께 가져옴.
     * N+1 문제를 해결하기 위함
     * @return 카테고리와 그룹 정보가 모두 포함된 리스트
     */
    @Query("SELECT DISTINCT c FROM Category c LEFT JOIN FETCH c.groups")
    List<Category> findAllWithGroups();
}