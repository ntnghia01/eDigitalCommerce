package com.backend.springboot.ecommerce.payload.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class AvatarRequestDto {
    private Integer userId;
    private String userImage;
    private MultipartFile image;
}
