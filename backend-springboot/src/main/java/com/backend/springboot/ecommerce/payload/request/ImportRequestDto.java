package com.backend.springboot.ecommerce.payload.request;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ImportRequestDto {
    private Integer importId;
    private Integer supplier;
    private Integer userId;
    private LocalDateTime importDate;
    private Integer importTotal;
    private Integer importStatus;
    private String supplierName;
}
