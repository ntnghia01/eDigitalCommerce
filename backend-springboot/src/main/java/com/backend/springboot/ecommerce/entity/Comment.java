package com.backend.springboot.ecommerce.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

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
@Table (name = "tbl_comment")

public class Comment implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cmtId;
    @Column (name = "cmt_time", nullable = false)
    private LocalDateTime cmtTime;
    @Column (name = "cmt_content", nullable = false)
    private String cmtContent;
    @Column (name = "cmt_status", nullable = false)
    private Integer cmtStatus;
    @Column (name = "cmt_created_at", nullable = false)
    private LocalDateTime cmtCreatedAt;
    @Column (name = "cmt_updated_at", nullable = false)
    private LocalDateTime cmtUpdatedAt;

    @ManyToOne
    @JoinColumn(name = "pro_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
}
