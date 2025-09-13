package com.csu.csu_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Entity
@Table(name = "groups")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "deleted_at IS NULL")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Lob
    private String description;

    @Column(length = 50)
    private String region;

    @Column(name = "max_members")
    private int maxMembers;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(length = 255)
    private String tags;

    @Formula("(SELECT COUNT(1) FROM memberships m WHERE m.group_id = group_id)")
    private int currentMembers;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Setter
    @Column(name = "cover_image_url")
    private String coverImageUrl;

    @Builder
    public Group(String name, String description, String region, int maxMembers, String imageUrl, String tags, User owner, Category category) {
        this.name = name;
        this.description = description;
        this.region = region;
        this.maxMembers = maxMembers;
        this.imageUrl = imageUrl;
        this.tags = tags;
        this.owner = owner;
        this.category = category;
        this.createdAt = LocalDateTime.now();
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }

    public void delegateOwner(User newOwner) {
        this.owner = newOwner;
    }

    public void update(String name, String description, String region, Integer maxMembers, String tags, Category category) {
        if (name != null) {
            this.name = name;
        }
        if (description != null) {
            this.description = description;
        }
        if (region != null) {
            this.region = region;
        }
        if (maxMembers != null) {
            this.maxMembers = maxMembers;
        }
        if (tags != null) {
            this.tags = tags;
        }
        if (category != null) {
            this.category = category;
        }
        this.updatedAt = LocalDateTime.now();
    }
}