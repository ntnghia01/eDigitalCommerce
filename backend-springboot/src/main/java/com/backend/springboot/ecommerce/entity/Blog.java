package com.backend.springboot.ecommerce.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "tbl_blog")
public class Blog implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer blogId;

    @Column (name = "blog_title", nullable = true)
    private String blogTitle;

    @Column (name = "blog_image", nullable = true)
    private String blogImage;

    @Column (name = "blog_content", nullable = true, columnDefinition = "TEXT")
    private String blogContent;

    @Column (name = "blog_status", nullable = true)
    private Integer blogStatus;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "blog_created_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime blogCreatedAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "blog_updated_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime blogUpdatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;
}
