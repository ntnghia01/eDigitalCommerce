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
@Table (name = "tbl_import")
public class Import implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer importId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "import_date", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime importDate;
    @Column (name = "import_total", nullable = true)
    private Integer importTotal;
    @Column (name = "import_status", nullable = true)
    private Integer importStatus;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "import_created_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime importCreatedAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "import_updated_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime importUpdatedAt;

    @ManyToOne
    @JoinColumn (name = "supplier_id", nullable = true)
    private Supplier supplier;

    @ManyToOne
    @JoinColumn (name = "admin_id", nullable = true)
    private Admin admin;
}
