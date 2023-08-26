package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class SupplierRequestDto {
    private Integer supplierId;
    private String supplierName;
    private String supplierEmail;
    private String supplierPhone;
    private String supplierAddress;
    private Integer supplierStatus;
}
