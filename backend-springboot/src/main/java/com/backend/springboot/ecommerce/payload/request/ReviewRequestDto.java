package com.backend.springboot.ecommerce.payload.request;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReviewRequestDto {
    private Integer reviewId;
    private LocalDateTime reviewTime;
    private Integer reviewRate;
    private String reviewContent;
    private Integer reviewStatus;

    private Integer order;
    private Integer user;
}
