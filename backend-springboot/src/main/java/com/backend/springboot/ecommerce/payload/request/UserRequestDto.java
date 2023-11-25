package com.backend.springboot.ecommerce.payload.request;

import java.sql.Date;

import lombok.Data;

@Data
public class UserRequestDto {
    private Integer userId;
    private String userPhone;
    private String userPassword;
    private String userName;
    private Integer userSex;
    private String userEmail;
    private Date userBirthday;
    private Integer userStatus;
    private Integer userRole;
}
