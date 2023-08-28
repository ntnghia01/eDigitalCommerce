package com.backend.springboot.ecommerce.payload.request;

import java.sql.Date;

import lombok.Data;

@Data
public class CustomerRequestDto {
    private Integer customerId;
    private String customerPhone;
    private String customerPassword;
    private String customerName;
    private Integer customerSex;
    private String customerEmail;
    private Date customerBirthday;
    private Integer customerStatus;
}
