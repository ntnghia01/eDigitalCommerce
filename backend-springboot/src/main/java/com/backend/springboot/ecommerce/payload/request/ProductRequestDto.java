package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class ProductRequestDto {
    private Integer proId;
    private String proName;
    private Integer proPrice;
    private String proDesc;
    private Integer proQuantity;
    private Integer proStatus;

    private Integer cateId;
    private Integer brandId;
}
