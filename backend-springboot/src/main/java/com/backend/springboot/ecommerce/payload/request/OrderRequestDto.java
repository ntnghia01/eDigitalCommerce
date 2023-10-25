package com.backend.springboot.ecommerce.payload.request;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class OrderRequestDto {
    private Integer orderId;
    private Integer customerId;
    private Integer shipperId;
    private Integer paymentId;
    private Integer adminId;
    private String orderCode;
    private LocalDateTime orderTime;
    private String orderName;
    private String orderPhone;
    private String orderAddress;
    private String orderNote;
    private Integer orderShipFee;
    private LocalDateTime orderShipExpected;
    private Integer orderTotalAmount;
    private LocalDateTime orderConfirmed;
    private LocalDateTime orderShipping;
    private LocalDateTime orderShipped;
    private LocalDateTime orderPaid;
    private LocalDateTime orderCompleted;
    private LocalDateTime orderReturned;
    private Integer orderStatus;
}
