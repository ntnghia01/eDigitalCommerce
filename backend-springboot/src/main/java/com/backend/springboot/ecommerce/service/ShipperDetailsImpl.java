package com.backend.springboot.ecommerce.service;

import com.backend.springboot.ecommerce.entity.Shipper;
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
@Table(name = "tbl_shipper")
public class ShipperDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer shipperId;
  @Column(name = "shipper_username", nullable = false)
  private String shipperUsername;
  @Column(name = "shipper_password", nullable = false)
  private String shipperPassword;
  @Column(name = "shipper_phone", nullable = false)
  private String shipperPhone;
  @JsonIgnore
  @Transient
  private Collection<? extends GrantedAuthority> authorities;

  public static UserDetailsImpl build(Shipper shipper) {
    List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    return new UserDetailsImpl(
        shipper.getShipperId(),
        shipper.getShipperUsername(),
        shipper.getShipperPassword(),
        shipper.getShipperPhone(),
            authorities);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {    
    return authorities;
  }

  @Override
  public String getUsername() {
    return shipperUsername;
  }

  @Override
  public String getPassword() {
    return shipperPassword;
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
    ShipperDetailsImpl shipper = (ShipperDetailsImpl) o;
    return Objects.equals(shipperUsername, shipper.shipperUsername);
  }

  @Override
  public int hashCode() {
    return Objects.hash(shipperId);
  }
}
