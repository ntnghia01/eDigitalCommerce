package com.backend.springboot.ecommerce.payload.request;

// import jakarta.validation.constraints.*;

import lombok.Data;
@Data
public class BrandRequestDto {
    private Integer brandId;
    private String brandName;
}
