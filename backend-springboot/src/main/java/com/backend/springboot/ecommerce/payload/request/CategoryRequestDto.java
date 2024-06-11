package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class CategoryRequestDto {
    private Integer categoryId;
    private String categoryName;
    private String categoryDesc;
    private Integer categoryStatus;
    private String categoryImage;
}
