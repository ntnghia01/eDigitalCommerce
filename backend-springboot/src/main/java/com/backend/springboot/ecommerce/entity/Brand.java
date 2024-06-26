package com.backend.springboot.ecommerce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_brand")
public class Brand implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer brandId;
    @Column(name="brand_name", nullable = false)
    private String brandName;
    @Column (name = "brand_desc", nullable = true)
    private String brandDesc;
    @Column (name = "brand_status", nullable = false)
    private Integer brandStatus;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name="brand_created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime brandCreatedAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name="brand_updated_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime brandUpdatedAt;
    @Column(name = "brand_image", nullable = true)
    private String brandImage;

    public Brand(String brandName, String brandDesc, String brandImage) {
        this.brandName = brandName;
        this.brandDesc = brandDesc;
        this.brandStatus = 1;
        this.brandImage = brandImage;
        this.brandCreatedAt = LocalDateTime.now();
        this.brandUpdatedAt = LocalDateTime.now();
    }

}
