package com.backend.springboot.ecommerce.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
// import java.util.Locale.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_category")

public class Category implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cateId;
    @Column(name = "cate_name", nullable = false)
    private String cateName;
    @Column(name = "cate_desc", nullable = true)
    private String cateDesc;
    @Column(name = "cate_status", nullable = false)
    private Integer cateStatus;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "cate_created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime cateCreatedAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "cate_updated_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime cateUpdatedAt;

    public Category(String cateName, String cateDesc) {
        this.cateName = cateName;
        this.cateDesc = cateDesc;
        this.cateStatus = 1;
        this.cateCreatedAt = LocalDateTime.now();
        this.cateUpdatedAt = LocalDateTime.now();
    }

}
