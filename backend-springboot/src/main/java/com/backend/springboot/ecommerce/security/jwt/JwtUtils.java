package com.backend.springboot.ecommerce.security.jwt;

import com.backend.springboot.ecommerce.service.UserDetailsImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${jwtSecret}")
  private String jwtSecret;

  @Value("${jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateJwtToken(Authentication authentication) {
    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

    return Jwts.builder()
            .setSubject(userPrincipal.getUsername())
            .claim("id", userPrincipal.getCustomerId())
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(getSecretKey())
            .compact();
  }

  private SecretKey getSecretKey() {
    byte[] decodedKey = jwtSecret.getBytes();
    return Keys.hmacShaKeyFor(decodedKey);
  }

  public String getCustomerPhoneFromJwtToken(String token) {
    Jws<Claims> claims = Jwts.parserBuilder()
            .setSigningKey(getSecretKey())
            .build()
            .parseClaimsJws(token);
    return claims.getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(getSecretKey()).build().parseClaimsJws(authToken);
      return true;
    } catch (Exception e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
      return false;
    }
  }
}
