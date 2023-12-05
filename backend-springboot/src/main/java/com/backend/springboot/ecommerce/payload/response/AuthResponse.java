package com.backend.springboot.ecommerce.payload.response;
import lombok.Data;
@Data
public class AuthResponse {
  private String accessToken;
  private String tokenType = "Bearer";
  private Integer userId;
  private String username;
  private String name;
  private String image;
  public AuthResponse(String accessToken, Integer userId, String username, String name, String image) {
    //Phản hồi lại sau khi đăng nhập thành công
    this.accessToken = accessToken;
    this.userId = userId;
    this.username = username;
    this.name = name;
    this.image = image;
  }

}
