package com.backend.springboot.ecommerce.payload.response;

import lombok.Data;

@Data
public class CartResponseDto {
    private Integer totalMoney;
    private Integer quantityItem;
    private Integer totalQuantityItem;
}
