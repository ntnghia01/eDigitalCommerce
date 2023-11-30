package com.backend.springboot.ecommerce.entity;

import java.io.Serializable;
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
@Table (name = "tbl_contact")
public class Contact implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer contactId;

    @Column (name = "contact_username", nullable = true)
    private String contactUsername;

    @Column (name = "contact_useremail", nullable = true)
    private String contactUserEmail;

    @Column (name = "contact_userphone", nullable = true)
    private String contactUserphone;

    @Column (name = "contact_title", nullable = true)
    private String contactTitle;

    @Column (name = "contact_content", nullable = true, columnDefinition = "TEXT")
    private String contactContent;

    @Column (name = "contact_status", nullable = true)
    private Integer contactStatus;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "contact_created_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime contactCreatedAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "contact_updated_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime contactUpdatedAt;

}
