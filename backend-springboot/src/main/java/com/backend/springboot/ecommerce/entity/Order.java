package com.backend.springboot.ecommerce.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_order")
public class Order implements Serializable  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;

    @Column (name = "order_code", nullable = false)
    private String orderCode;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "order_time", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime orderTime;

    @Column (name = "order_name", nullable = false)
    private String orderName;

    @Column (name = "order_phone", nullable = false)
    private String orderPhone;

    @Column (name = "order_address", nullable = false)
    private String orderAddress;

    @Column (name = "order_note", nullable = true)
    private String orderNote;

    @Column (name = "order_ship_fee", nullable = true)
    private Integer orderShipFee;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "order_ship_expected", nullable = true)
    private LocalDateTime orderShipExpected;

    @Column (name = "order_total_amount", nullable = false)
    private Integer orderTotalAmount;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "order_confirmed", nullable = true)
    private LocalDateTime orderConfirmed;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "order_shipping", nullable = true)
    private LocalDateTime orderShipping;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "order_shipped", nullable = true)
    private LocalDateTime orderShipped;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "order_paid", nullable = true)
    private LocalDateTime orderPaid;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "order_completed", nullable = true)
    private LocalDateTime orderCompleted;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "order_cancelled", nullable = true)
    private LocalDateTime orderCancelled;

    @Column (name = "order_status", nullable = false)
    private Integer orderStatus;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "order_created_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime orderCreatedAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column (name = "order_updated_at", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime orderUpdatedAt;

    @ManyToOne
    @JoinColumn (name = "user_id", nullable = true)
    private User user;

    @ManyToOne
    @JoinColumn (name = "shipper_id", nullable = true)
    private User shipper;

    @ManyToOne
    @JoinColumn (name = "payment_id", nullable = true)
    private Payment payment;

    @ManyToOne
    @JoinColumn (name = "admin_id", nullable = true)
    private User admin;

}
