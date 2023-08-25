package com.backend.springboot.ecommerce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.time.LocalDateTime;

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
    @Column(name="brand_created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime brandCreatedAt;
    @Column(name="brand_updated_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime brandUpdatedAt;

    public Brand(String brandName) {
        this.brandName = brandName;
        this.brandCreatedAt = LocalDateTime.now();
        this.brandUpdatedAt = LocalDateTime.now();
    }

}
