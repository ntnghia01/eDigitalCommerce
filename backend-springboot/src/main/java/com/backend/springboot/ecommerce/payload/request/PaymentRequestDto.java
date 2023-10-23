package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class PaymentRequestDto {
    private Integer paymentId;
    private String paymentName;
    private String paymentExplain;
    private Integer paymentStatus;
}
