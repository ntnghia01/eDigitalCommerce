package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class AddressRequestDto {
    private Integer addressId;
    private String addressName;
    private String addressPhone;
    private String addressFull;
    private String addressStatus;
    private Integer customer;
}
