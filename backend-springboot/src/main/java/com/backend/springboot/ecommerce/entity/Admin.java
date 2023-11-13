package com.backend.springboot.ecommerce.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

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
@Table (name = "tbl_admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer adminId;

    @Column (name = "admin_username", nullable = false)
    private String adminUsername;

    @Column (name = "admin_password", nullable = false)
    private String adminPassword;

    @Column (name = "admin_name", nullable = true)
    private String adminName;

    @Column (name = "admin_email", nullable = true)
    private String adminEmail;

    @Column (name = "admin_status", nullable = true)
    private Integer adminStatus;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "admin_created_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime adminCreatedAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "admin_updated_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime adminUpdatedAt;

}
