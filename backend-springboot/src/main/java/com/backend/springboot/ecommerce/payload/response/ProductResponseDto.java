package com.backend.springboot.ecommerce.payload.response;

import com.backend.springboot.ecommerce.entity.Product;

import lombok.Data;

@Data
public class ProductResponseDto {
    private String message;
    private Product productObject;
}
