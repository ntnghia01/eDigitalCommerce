package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class CartDetailRequestDto {
    private Integer cartDetailId;
    private Integer cartId;
    private Integer proId;
    private Integer cartDetailQuantity;
    private Integer customerId;
    private String search;
}
