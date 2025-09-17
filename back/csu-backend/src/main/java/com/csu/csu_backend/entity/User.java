package com.csu.csu_backend.entity;

import com.csu.csu_backend.controller.dto.UserDTO;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import org.springframework.util.StringUtils; // 추가

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "deleted_at IS NULL")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, length = 50)
    private String nickname;

    @Column(length = 50)
    private String region;

    @Setter
    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "refresh_token")
    private String refreshToken;

    private String introduction;

    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;

    @OneToMany(mappedBy = "owner")
    private List<Group> ownedGroups = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Membership> memberships = new ArrayList<>();

    public User(String email, String password, String nickname, String region) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.region = region;
        this.createdAt = LocalDateTime.now();
    }

    public User(String email, String password, String nickname) {
        this(email, password, nickname, null);
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }

    public void updateProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void updateProfile(UserDTO.UpdateUserRequest request) {
        if (StringUtils.hasText(request.getNickname())) {
            this.nickname = request.getNickname();
        }
        if (StringUtils.hasText(request.getRegion())) {
            this.region = request.getRegion();
        }
        if (StringUtils.hasText(request.getIntroduction())) {
            this.introduction = request.getIntroduction();
        }
        // ▼▼▼ 수정된 부분 ▼▼▼
        if (StringUtils.hasText(request.getProfileImageUrl())) {
            this.profileImageUrl = request.getProfileImageUrl();
        }
        // ▲▲▲ 수정된 부분 ▲▲▲
    }
}