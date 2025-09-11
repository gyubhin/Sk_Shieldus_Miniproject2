package com.csu.csu_backend.repository;

import com.csu.csu_backend.entity.Group;
import com.csu.csu_backend.entity.GroupLike;
import com.csu.csu_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface GroupLikeRepository extends JpaRepository<GroupLike, Long> {

    Optional<GroupLike> findByUserAndGroup(User user, Group group);

    @Query("SELECT gl.group.id FROM GroupLike gl WHERE gl.user.id = :userId")
    Set<Long> findLikedGroupIdsByUserId(@Param("userId") Long userId);
}