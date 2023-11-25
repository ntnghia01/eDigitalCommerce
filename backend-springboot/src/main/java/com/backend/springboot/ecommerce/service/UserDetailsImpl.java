package com.backend.springboot.ecommerce.service;


import com.backend.springboot.ecommerce.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_user")
public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer userId;
  @Column(name = "user_phone", nullable = false)
  private String userPhone;
  @Column(name = "user_password", nullable = false)
  private String userPassword;
  @Column(name = "user_name", nullable = false)
  private String userName;
  @JsonIgnore
  @Transient
  private Collection<? extends GrantedAuthority> authorities;

  public static UserDetailsImpl build(User user) {
    List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    return new UserDetailsImpl(
        user.getUserId(),
        user.getUserPhone(),
        user.getUserPassword(),
        user.getUserName(),
            authorities);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {    
    return authorities;
  }

  @Override
  public String getUsername() {
    return userName;
  }

  @Override
  public String getPassword() {
    return userPassword;
  }

  /** ------------------------------------------ */
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
  /** ------------------------------------------ */
  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(userPhone, user.userPhone);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId);
  }
}
