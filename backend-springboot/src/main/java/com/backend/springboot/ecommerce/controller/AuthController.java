package com.backend.springboot.ecommerce.controller;

import com.backend.springboot.ecommerce.entity.Customer;
import com.backend.springboot.ecommerce.payload.request.AuthRequestDto;
import com.backend.springboot.ecommerce.payload.request.CustomerRequestDto;
import com.backend.springboot.ecommerce.payload.response.AuthResponse;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.CustomerRepository;
import com.backend.springboot.ecommerce.security.jwt.JwtUtils;
import com.backend.springboot.ecommerce.service.UserDetailsImpl;
import com.backend.springboot.ecommerce.service.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  CustomerRepository customerRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  UserDetailsServiceImpl userService;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequestDto authRequestDto) {

    Optional<Customer> customer = userService.getByCustomer(authRequestDto.getUsername());
    if (!customerRepository.existsByCustomerPhone(authRequestDto.getUsername())) {
      return new ResponseEntity<>(new MessageResponse("INVALID_USERNAME"), HttpStatus.BAD_REQUEST);
    }

    //tạo chuỗi mật khẩu cộng với ngayTao trong TaiKhoan
    String matKhau = authRequestDto.getPassword() + customer.get().getCustomerCreatedAt().toLocalDate().toString();
    // System.out.println("'"+matKhau+"'");
    // System.out.println("'"+customer.get().getCustomerPassword()+"'");

    //kiểm tra mật khẩu
    if (!encoder.matches(matKhau, customer.get().getCustomerPassword())) {
      return new ResponseEntity<>(new MessageResponse("INVALID_PASSWORD"), HttpStatus.BAD_REQUEST);
    }
    System.out.println(matKhau);
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequestDto.getUsername(), matKhau));
System.out.println(authentication);
    // Lưu trữ thông tin xác thực của người dùng vào SecurityContextHolder
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);


   
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    // Gửi token về cho client
    return ResponseEntity.ok(new AuthResponse(jwt, userDetails.getCustomerId(), userDetails.getUsername(), userDetails.getCustomerName()));
  }




  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody CustomerRequestDto customerRequestDto) {
    if (customerRepository.existsByCustomerPhone(customerRequestDto.getCustomerPhone())) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Customer's Phone is already taken!"));
    }
    // Lấy thời gian hiện tại
    LocalDate ngayHienTai = LocalDate.now();

    // Cộng chuỗi thời gian hiện tại với mật khẩu
    String matKhau = customerRequestDto.getCustomerPassword() + ngayHienTai.toString();

    // Tạo tài khoản mới
    Customer newCustomer = new Customer();
    newCustomer.setCustomerPhone(customerRequestDto.getCustomerPhone());
    newCustomer.setCustomerPassword(encoder.encode(matKhau));
    newCustomer.setCustomerName(customerRequestDto.getCustomerName());
    newCustomer.setCustomerSex(customerRequestDto.getCustomerSex());
    newCustomer.setCustomerEmail(customerRequestDto.getCustomerEmail());
    newCustomer.setCustomerBirthday(customerRequestDto.getCustomerBirthday());
    newCustomer.setCustomerStatus(1);
    newCustomer.setCustomerCreatedAt(LocalDateTime.now());
    newCustomer.setCustomerUpdatedAt(LocalDateTime.now());

    customerRepository.save(newCustomer);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }




  @PostMapping("/test")
  public ResponseEntity<?> test(@RequestBody AuthRequestDto authRequestDto) {
    Optional<Customer> cusOptional = customerRepository.findByCustomerPhone(authRequestDto.getUsername());
    if (cusOptional.isPresent()) {
      Customer cus = cusOptional.get();
      return new ResponseEntity<>(cus, HttpStatus.OK);
    } else  {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  // @PostMapping("/signout")
  // public ResponseEntity<?> logoutUser() {
  //   // Xóa xác thực người dùng
  //   SecurityContextHolder.clearContext();
  //   return ResponseEntity.ok(new MessageResponse("You've been signed out!"));
  // }

}
