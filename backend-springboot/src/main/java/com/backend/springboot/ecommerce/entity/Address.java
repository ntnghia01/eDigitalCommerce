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
@Table (name = "tbl_address")
public class Address implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addressId;

    @Column (name = "address_name", nullable = true)
    private String addressName;
    
    @Column (name = "address_phone", nullable = true)
    private String addressPhone;

    @Column (name = "address_full", nullable = true)
    private String addressFull;

    @Column (name = "province_id", nullable = true)
    private Integer provinceId;

    @Column (name = "district_id", nullable = true)
    private Integer districtId;

    @Column (name = "ward_code", nullable = true)
    private String wardCode;

    @Column (name = "address_status", nullable = true)
    private Integer addressStatus;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "address_created_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime addressCreatedAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "address_updated_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime addressUpdatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
