package com.backend.springboot.ecommerce.entity;

import java.io.Serializable;

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
@Table (name = "tbl_import_detail")
public class ImportDetail implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer importDetailId;
    @Column (name = "import_detail_quantity", nullable = false)
    private Integer importDetailQuantity;
    @Column (name = "import_detail_price", nullable = true)
    private Integer importDetailPrice;
    
    @ManyToOne
    @JoinColumn(name = "pro_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "import_id", nullable = false)
    private Import importImport;
}
