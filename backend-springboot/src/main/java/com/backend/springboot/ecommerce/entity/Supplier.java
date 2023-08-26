package com.backend.springboot.ecommerce.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_supplier")

public class Supplier implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer supplierId;
    @Column (name = "supplier_name", nullable = false)
    private String supplierName;
    @Column (name = "supplier_email", nullable = false)
    private String supplierEmail;
    @Column (name = "supplier_phone", nullable = false)
    private String supplierPhone;
    @Column (name = "supplier_address", nullable = false)
    private String supplierAddress;
    @Column (name = "supplier_status", nullable = false)
    private Integer supplierStatus;
    @Column (name = "supplier_created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime supplierCreatedAt;
    @Column (name = "supplier_updated_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime supplierUpdatedAt;

    public Supplier(String supplierName, String supplierEmail, String supplierPhone, String supplierAddress) {
        this.supplierName = supplierName;
        this.supplierEmail = supplierEmail;
        this.supplierPhone = supplierPhone;
        this.supplierAddress = supplierAddress;
        this.supplierStatus = 1;
        this.supplierCreatedAt = LocalDateTime.now();
        this.supplierUpdatedAt = LocalDateTime.now();
    }
}
