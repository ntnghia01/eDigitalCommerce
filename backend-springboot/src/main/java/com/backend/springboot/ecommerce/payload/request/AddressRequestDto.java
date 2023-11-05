package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class AddressRequestDto {
    private Integer addressId;
    private String addressName;
    private String addressPhone;
    private String addressFull;
    private Integer addressStatus;
    private Integer customer;
    private Integer customerId;
    private Integer provinceId;
    private Integer districtId;
    private String wardCode;
}
