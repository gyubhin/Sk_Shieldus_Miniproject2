package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.Membership;
import com.csu.csu_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
    boolean existsByUserAndGroup(User user, Group group);
    long countByGroup(Group group);
    List<Membership> findByGroup(Group group);
    Optional<Membership> findByUserAndGroup(User user, Group group);
    List<Membership> findByUser(User user); // 추가
}