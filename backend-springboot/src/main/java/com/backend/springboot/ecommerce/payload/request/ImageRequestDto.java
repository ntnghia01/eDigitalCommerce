package com.backend.springboot.ecommerce.payload.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ImageRequestDto {
    private Integer imageId;
    private Integer proId;
    private String imageImage;
    private MultipartFile image;
}
