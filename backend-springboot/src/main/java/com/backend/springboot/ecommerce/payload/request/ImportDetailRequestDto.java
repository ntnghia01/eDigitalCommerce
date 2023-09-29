package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class ImportDetailRequestDto {
    private Integer importDetailId;
    private Integer product;
    private Integer importImport;
    private Integer importDetailQuantity;
    private Integer importDetailPrice;
}
