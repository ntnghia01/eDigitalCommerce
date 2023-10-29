package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class ShipperRequestDto {
  private Integer shipperId;
  private String shipperUsername;
  private String shipperPassword;
  private String shipperName;
  private String shipperPhone;
  private Integer shipperStatus;
}
