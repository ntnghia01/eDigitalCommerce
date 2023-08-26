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
@Table (name = "tbl_product")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer proId;
    @Column (name = "pro_name", nullable = false)
    private String proName;
    @Column (name = "pro_price", nullable = true)
    private Integer proPrice;
    @Column (name = "pro_desc", nullable = true)
    private String proDesc;
    @Column (name = "pro_quantity", nullable = false)
    private Integer proQuantity;
    @Column (name = "pro_status", nullable = false)
    private Integer proStatus;
    @Column (name = "pro_created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime proCreatedAt;
    @Column (name = "pro_updated_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime proUpdatedAt;

    @ManyToOne
    @JoinColumn(name = "cate_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

}
