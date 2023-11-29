package com.backend.springboot.ecommerce.controller;

import com.backend.springboot.ecommerce.entity.Cart;
import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.payload.request.AuthRequestDto;
import com.backend.springboot.ecommerce.payload.request.UserRequestDto;
import com.backend.springboot.ecommerce.payload.response.AuthResponse;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.CartRepository;
import com.backend.springboot.ecommerce.repository.UserRepository;
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
  UserRepository customerRepository;

  @Autowired
  private CartRepository cartRepository;


  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  UserDetailsServiceImpl userService;


  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequestDto authRequestDto) {

    Optional<User> customer = userService.getByUser(authRequestDto.getUsername());
    if (!customerRepository.existsByUserPhoneAndUserStatusNot(authRequestDto.getUsername(), -1)) {
      return new ResponseEntity<>(new MessageResponse("INVALID_USERNAME"), HttpStatus.BAD_REQUEST);
    }

    //tạo chuỗi mật khẩu cộng với ngayTao trong TaiKhoan
    String matKhau = authRequestDto.getPassword() + customer.get().getUserCreatedAt().toLocalDate().toString();
    // System.out.println("'"+matKhau+"'");
    // System.out.println("'"+customer.get().getCustomerPassword()+"'");

    //kiểm tra mật khẩu
    if (!encoder.matches(matKhau, customer.get().getUserPassword())) {
      return new ResponseEntity<>(new MessageResponse("INVALID_PASSWORD"), HttpStatus.BAD_REQUEST);
    }
    System.out.println("Password is: " + encoder.encode(matKhau));
    System.out.println("Password is: " + customer.get().getUserPassword());
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequestDto.getUsername(), matKhau));
    System.out.println(authentication);
    // Lưu trữ thông tin xác thực của người dùng vào SecurityContextHolder
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);


   
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    // Gửi token về cho client
    return ResponseEntity.ok(new AuthResponse(jwt, userDetails.getUserId(), userDetails.getUsername(), userDetails.getUserPhone()));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody UserRequestDto customerRequestDto) {
    if (customerRepository.existsByUserPhone(customerRequestDto.getUserPhone())) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Customer's Phone is already taken!"));
    }
    // Lấy thời gian hiện tại
    LocalDate ngayHienTai = LocalDate.now();

    // Cộng chuỗi thời gian hiện tại với mật khẩu
    String matKhau = customerRequestDto.getUserPassword() + ngayHienTai.toString();

    // Tạo tài khoản mới
    User newCustomer = new User();
    newCustomer.setUserRole(customerRequestDto.getUserRole());
    newCustomer.setUserPhone(customerRequestDto.getUserPhone());
    newCustomer.setUserPassword(encoder.encode(matKhau));
    newCustomer.setUserName(customerRequestDto.getUserName());
    newCustomer.setUserSex(customerRequestDto.getUserSex());
    newCustomer.setUserEmail(customerRequestDto.getUserEmail());
    newCustomer.setUserBirthday(customerRequestDto.getUserBirthday());
    newCustomer.setUserStatus(1);
    newCustomer.setUserCreatedAt(LocalDateTime.now());
    newCustomer.setUserUpdatedAt(LocalDateTime.now());

    User customer = customerRepository.save(newCustomer);
    System.out.println(customer);
    Cart cart = new Cart();
    cart.setUser(customer);
    cart.setCartCreatedAt(LocalDateTime.now());
    cart.setCartUpdatedAt(LocalDateTime.now());
    cartRepository.save(cart);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("/test")
  public ResponseEntity<?> test(@RequestBody AuthRequestDto authRequestDto) {
    Optional<User> cusOptional = customerRepository.findByUserPhone(authRequestDto.getUsername());
    if (cusOptional.isPresent()) {
      User cus = cusOptional.get();
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

  // @PostMapping("/shipper/signup")
  // public ResponseEntity<?> createShipperAccount(@Valid @RequestBody ShipperRequestDto shipperRequestDto) {
  //   if (shipperRepository.existsByShipperUsername(shipperRequestDto.getShipperUsername())) {
  //     return ResponseEntity
  //             .badRequest()
  //             .body(new MessageResponse("Error: Shipper's Username is already existed!"));
  //   }
  //   // Lấy thời gian hiện tại
  //   LocalDate ngayHienTai = LocalDate.now();

  //   // Cộng chuỗi thời gian hiện tại với mật khẩu
  //   String matKhau = shipperRequestDto.getShipperPassword() + ngayHienTai.toString();

  //   // Tạo tài khoản mới
  //   Shipper newShipper = new Shipper();
  //   newShipper.setShipperUsername(shipperRequestDto.getShipperUsername());
  //   newShipper.setShipperPassword(encoder.encode(matKhau));
  //   newShipper.setShipperName(shipperRequestDto.getShipperName());
  //   newShipper.setShipperPhone(shipperRequestDto.getShipperPhone());
  //   newShipper.setShipperStatus(1);
  //   newShipper.setShipperCreatedAt(LocalDateTime.now());
  //   newShipper.setShipperUpdatedAt(LocalDateTime.now());

  //   Shipper shipper = shipperRepository.save(newShipper);
  //   System.out.println(shipper);

  //   return ResponseEntity.ok(new MessageResponse("Shipper registered successfully!"));
  // }

  // @PostMapping("/shipper/signin")
  // public ResponseEntity<?> authenticateShipper(@Valid @RequestBody AuthRequestDto authRequestDto) {


    
  //   // ERRORING


  //   Optional<Shipper> shipper = shipperDetailsServiceImpl.getByShipper(authRequestDto.getUsername());
  //   if (!shipperRepository.existsByShipperUsername(authRequestDto.getUsername())) 
  //   // if (!shipperRepository.existsByShipperUsername(authRequestDto.getUsername()).isPresent()) 
  //   {
  //     return new ResponseEntity<>(new MessageResponse("INVALID_USERNAME"), HttpStatus.BAD_REQUEST);
  //   }

  //   //tạo chuỗi mật khẩu cộng với ngayTao trong TaiKhoan
  //   String matKhau = authRequestDto.getPassword() + shipper.get().getShipperCreatedAt().toLocalDate().toString();
  //   // System.out.println("'"+matKhau+"'");
  //   // System.out.println("'"+customer.get().getCustomerPassword()+"'");

  //   //kiểm tra mật khẩu
  //   if (!encoder.matches(matKhau, shipper.get().getShipperPassword())) {
  //     return new ResponseEntity<>(new MessageResponse("INVALID_PASSWORD"), HttpStatus.BAD_REQUEST);
  //   }
  //   System.out.println("Password is: " + encoder.encode(matKhau));
  //   System.out.println("Password is: " + shipper.get().getShipperPassword());
  //   Authentication authentication = authenticationManager.authenticate(
  //           new UsernamePasswordAuthenticationToken(authRequestDto.getUsername(), matKhau));
  //   System.out.println(authentication);
  //   // Lưu trữ thông tin xác thực của người dùng vào SecurityContextHolder
  //   SecurityContextHolder.getContext().setAuthentication(authentication);
  //   String jwt = jwtUtils.generateJwtToken(authentication);


   
  //   ShipperDetailsImpl shipperDetailsImpl = (ShipperDetailsImpl) authentication.getPrincipal();
  //   // Gửi token về cho client
  //   return ResponseEntity.ok(new AuthResponse(jwt, shipperDetailsImpl.getShipperId(), shipperDetailsImpl.getUsername(), shipperDetailsImpl.getShipperPhone()));
  // }

}
