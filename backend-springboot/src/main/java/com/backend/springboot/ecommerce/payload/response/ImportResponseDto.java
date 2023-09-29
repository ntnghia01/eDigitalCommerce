package com.backend.springboot.ecommerce.payload.response;

import com.backend.springboot.ecommerce.entity.Import;

import lombok.Data;

@Data
public class ImportResponseDto {
    private String message;
    private Import importObject;
}
