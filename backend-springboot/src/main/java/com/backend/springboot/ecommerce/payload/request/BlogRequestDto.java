package com.backend.springboot.ecommerce.payload.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class BlogRequestDto {
    private Integer blogId;
    private String blogTitle;
    private String blogImage;
    private String blogContent;
    private Integer blogStatus;

    private Integer userId;

    private MultipartFile image;
}
