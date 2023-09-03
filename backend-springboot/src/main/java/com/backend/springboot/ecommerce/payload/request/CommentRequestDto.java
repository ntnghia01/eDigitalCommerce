package com.backend.springboot.ecommerce.payload.request;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CommentRequestDto {
    private Integer cmtId;
    private LocalDateTime cmtTime;
    private String cmtContent;
    private Integer cmtStatus;

    private Integer product;
    private Integer customer;
}
