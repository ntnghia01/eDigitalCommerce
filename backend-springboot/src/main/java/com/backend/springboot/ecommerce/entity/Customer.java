package com.backend.springboot.ecommerce.entity;

import java.io.Serializable;
import java.sql.Date;
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
@Table (name = "tbl_customer")
public class Customer implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customerId;

    @Column (name = "user_role", nullable = false)
    private Integer userRole;

    @Column (name = "customer_phone", nullable = false)
    private String customerPhone;

    @Column (name = "customer_password", nullable = false)
    private String customerPassword;

    @Column (name = "customer_name", nullable = false)
    private String customerName;

    @Column (name = "customer_sex", nullable = true)
    private Integer customerSex;

    @Column (name = "customer_email", nullable = true)
    private String customerEmail;

    @Column (name = "customer_birthday", nullable = true)
    private Date customerBirthday;

    @Column (name = "customer_status", nullable = false)
    private Integer customerStatus;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "customer_created_at", nullable = false)
    private LocalDateTime customerCreatedAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "customer_updated_at", nullable = false)
    private LocalDateTime customerUpdatedAt;

}
