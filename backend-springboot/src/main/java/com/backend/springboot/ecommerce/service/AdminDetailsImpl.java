package com.backend.springboot.ecommerce.service;


import com.backend.springboot.ecommerce.entity.Admin;
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
@Table(name = "tbl_admin")
public class AdminDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer adminId;
  @Column(name = "admin_username", nullable = false)
  private String adminUsername;
  @Column(name = "admin_password", nullable = false)
  private String adminPassword;
  @Column(name = "admin_name", nullable = false)
  private String adminName;
  @JsonIgnore
  @Transient
  private Collection<? extends GrantedAuthority> authorities;

  public static AdminDetailsImpl build(Admin admin) {
    List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    return new AdminDetailsImpl(
        admin.getAdminId(),
        admin.getAdminUsername(),
        admin.getAdminPassword(),
        admin.getAdminName(),
            authorities);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {    
    return authorities;
  }

  @Override
  public String getUsername() {
    return adminUsername;
  }

  @Override
  public String getPassword() {
    return adminPassword;
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
    AdminDetailsImpl user = (AdminDetailsImpl) o;
    return Objects.equals(adminUsername, user.adminUsername);
  }

  @Override
  public int hashCode() {
    return Objects.hash(adminId);
  }
}
