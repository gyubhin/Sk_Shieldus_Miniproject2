package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.Membership;
import com.csu.csu_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
    boolean existsByUserAndGroup(User user, Group group);
    long countByGroup(Group group);
    List<Membership> findByGroup(Group group);
    Optional<Membership> findByUserAndGroup(User user, Group group);
    List<Membership> findByUser(User user);

    @Query("SELECT m.group.id FROM Membership m WHERE m.user.id = :userId")
    Set<Long> findJoinedGroupIdsByUserId(@Param("userId") Long userId);
}