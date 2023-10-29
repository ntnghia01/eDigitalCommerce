package com.backend.springboot.ecommerce.service;

import com.backend.springboot.ecommerce.entity.Shipper;
import com.backend.springboot.ecommerce.repository.ShipperRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ShipperDetailsServiceImpl implements UserDetailsService {
  @Autowired
  ShipperRepository shipperRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String shipperUsername) throws UsernameNotFoundException {
    Shipper shipper = shipperRepository.findByShipperUsername(shipperUsername)
        .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản với username là: " + shipperUsername));
    return ShipperDetailsImpl.build(shipper);
  }

  public Optional<Shipper> getByShipper(String shipperUsername){
    return shipperRepository.findByShipperUsername(shipperUsername);
  }

}
