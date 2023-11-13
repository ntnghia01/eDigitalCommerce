package com.backend.springboot.ecommerce.payload.request;

// import java.io.Serializable;

import lombok.Data;
// import lombok.Getter;
// import lombok.Setter;

// @Getter
// @Setter
// public class VNPAYRequestDto implements Serializable { // Test VN-PAY
//     private String status;
//     private String message;
//     private String url;
// }
@Data
public class VNPAYRequestDto {
    private Integer amount;
    private String orderInfo;
}