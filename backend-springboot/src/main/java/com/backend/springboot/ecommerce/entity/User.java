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
@Table (name = "tbl_user")
public class User implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column (name = "user_role", nullable = false)
    private Integer userRole;

    @Column (name = "user_phone", nullable = false)
    private String userPhone;

    @Column (name = "user_password", nullable = false)
    private String userPassword;

    @Column (name = "user_name", nullable = false)
    private String userName;

    @Column (name = "user_sex", nullable = true)
    private Integer userSex;

    @Column (name = "user_email", nullable = true)
    private String userEmail;

    @Column (name = "user_birthday", nullable = true)
    private Date userBirthday;

    @Column (name = "user_image", nullable = true)
    private String userImage;

    @Column (name = "user_status", nullable = false)
    private Integer userStatus;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "user_created_at", nullable = false)
    private LocalDateTime userCreatedAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "user_updated_at", nullable = false)
    private LocalDateTime userUpdatedAt;

}
