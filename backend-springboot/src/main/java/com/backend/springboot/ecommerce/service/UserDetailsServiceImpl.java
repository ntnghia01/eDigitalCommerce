package com.backend.springboot.ecommerce.service;

import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.repository.UserRepository;

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
  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String userPhone) throws UsernameNotFoundException {
    User user = userRepository.findByUserPhone(userPhone)
        .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản với sdt là: " + userPhone));
    return UserDetailsImpl.build(user);
  }

  public Optional<User> getByUser(String userPhone){
    return userRepository.findByUserPhone(userPhone);
  }

}
