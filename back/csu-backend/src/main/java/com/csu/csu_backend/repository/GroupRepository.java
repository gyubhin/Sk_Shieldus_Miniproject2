package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Group;
import jakarta.persistence.LockModeType; // 추가
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock; // 추가
import org.springframework.data.jpa.repository.Query; // 추가
import org.springframework.data.repository.query.Param; // 추가

import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Long>, JpaSpecificationExecutor<Group> {
    Optional<Group> findByName(String name);

    // --- 아래 메서드를 새로 추가 ---
    /**
     * 비관적 락을 사용하여 그룹 이름으로 조회합니다.
     * 동일한 이름의 그룹 생성을 시도하는 동시성 문제를 방지합니다.
     * @param name 그룹 이름
     * @return Group Optional 객체
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT g FROM Group g WHERE g.name = :name")
    Optional<Group> findByNameWithLock(@Param("name") String name);
}