package com.backend.springboot.ecommerce.service;

import com.backend.springboot.ecommerce.entity.Customer;
import com.backend.springboot.ecommerce.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  CustomerRepository customerRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String customerPhone) throws UsernameNotFoundException {
    Customer customer = customerRepository.findByCustomerPhone(customerPhone)
        .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản với sdt là: " + customerPhone));
    return UserDetailsImpl.build(customer);
  }

  public Optional<Customer> getByCustomer(String customerPhone){
    return customerRepository.findByCustomerPhone(customerPhone);
  }

}
