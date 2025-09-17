package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Group;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

// JpaSpecificationExecutor를 상속받아 동적 쿼리 기능을 사용합니다.
public interface GroupRepository extends JpaRepository<Group, Long>, JpaSpecificationExecutor<Group> {
    Optional<Group> findByName(String name);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT g FROM Group g WHERE g.name = :name")
    Optional<Group> findByNameWithLock(@Param("name") String name);

    // search 메서드는 GroupService에서 Specification으로 대체되었으므로 삭제합니다.
}