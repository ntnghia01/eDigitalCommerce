package com.backend.springboot.ecommerce.payload.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProductRequestDto {
    private Integer proId;
    private String proName;
    private String proImage;
    private Integer proPrice;
    private String proDesc;
    private Integer proQuantity;
    private Integer proStatus;

    private Integer cateId;
    private Integer brandId;

    private MultipartFile image;
}
