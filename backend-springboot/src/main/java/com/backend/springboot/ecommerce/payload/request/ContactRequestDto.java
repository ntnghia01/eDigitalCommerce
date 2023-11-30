package com.backend.springboot.ecommerce.payload.request;

import lombok.Data;

@Data
public class ContactRequestDto {
    private Integer contactId;
    private String contactUsername;
    private String contactUserphone;
    private String contactUseremail;
    private String contactTitle;
    private String contactContent;
    private Integer contactStatus;
}
