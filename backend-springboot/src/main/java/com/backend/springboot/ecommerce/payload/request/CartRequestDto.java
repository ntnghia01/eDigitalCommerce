package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class CartRequestDto {
    private Integer cartId;
    private Integer customerId;
}
