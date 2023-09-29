package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class AdminRequestDto {
    private Integer adminId;
    private String adminUsername;
    private String adminPassword;
    private String adminName;
    private String adminEmail;
    private Integer adminStatus;
}
