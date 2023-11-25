package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Cart;
import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.payload.request.UserRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.CartRepository;
import com.backend.springboot.ecommerce.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllCustomer() {
        List<User> customers = userRepository.findAll();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<User> getCustomerById(@PathVariable Integer customerId) {
        Optional<User> customerOptional = userRepository.findById(customerId);
        if (customerOptional.isPresent()) {
            User customer = customerOptional.get();
            return new ResponseEntity<User>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody UserRequestDto customerRequestDto) {
        User newCustomer = new User();

        newCustomer.setUserPhone(customerRequestDto.getUserPhone());
        newCustomer.setUserPassword(customerRequestDto.getUserPassword());
        newCustomer.setUserName(customerRequestDto.getUserName());
        newCustomer.setUserSex(customerRequestDto.getUserSex());
        newCustomer.setUserEmail(customerRequestDto.getUserEmail());
        newCustomer.setUserBirthday(customerRequestDto.getUserBirthday());
        newCustomer.setUserStatus(1);
        newCustomer.setUserCreatedAt(LocalDateTime.now());
        newCustomer.setUserUpdatedAt(LocalDateTime.now());

        User customer = userRepository.save(newCustomer);

        // Create Cart for Customer
        Cart cart = new Cart();
        cart.setUser(customer);
        cartRepository.save(cart);

        return ResponseEntity.ok(new MessageResponse("Add customer successfully!"));
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<?> updateCustomer(@PathVariable Integer customerId, @RequestBody UserRequestDto customerRequestDto) {
        Optional<User> customerOptional = userRepository.findById(customerId);

        if (customerOptional.isPresent()) {
            User customer = customerOptional.get();

            customer.setUserPhone(customerRequestDto.getUserPhone());
            customer.setUserPassword(customerRequestDto.getUserPassword());
            customer.setUserName(customer.getUserName());
            customer.setUserSex(customerRequestDto.getUserSex());
            customer.setUserEmail(customerRequestDto.getUserEmail());
            customer.setUserBirthday(customer.getUserBirthday());
            customer.setUserStatus(customerRequestDto.getUserStatus());
            customer.setUserUpdatedAt(LocalDateTime.now());

            userRepository.save(customer);
            return ResponseEntity.ok(new MessageResponse("Update customer successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Integer customerId) {
        Optional<User> customerOptional = userRepository.findById(customerId);
        if (customerOptional.isPresent()) {
            User customer = customerOptional.get();
            customer.setUserStatus(-1);
            userRepository.save(customer);
            return ResponseEntity.ok(new MessageResponse("Delete customer successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> customerLogin(@RequestBody CustomerRequestDto customerRequestDto) {
    //     Customer newCustomer = new Customer();

    //     newCustomer.setCustomerPhone(customerRequestDto.getCustomerPhone());
    //     newCustomer.setCustomerPassword(customerRequestDto.getCustomerPassword());
    //     newCustomer.setCustomerName(customerRequestDto.getCustomerName());
    //     newCustomer.setCustomerSex(customerRequestDto.getCustomerSex());
    //     newCustomer.setCustomerEmail(customerRequestDto.getCustomerEmail());
    //     newCustomer.setCustomerBirthday(customerRequestDto.getCustomerBirthday());
    //     newCustomer.setCustomerStatus(1);
    //     newCustomer.setCustomerCreatedAt(LocalDateTime.now());
    //     newCustomer.setCustomerUpdatedAt(LocalDateTime.now());

    //     customerRepository.save(newCustomer);
    //     return ResponseEntity.ok(new MessageResponse("Add customer successfully!"));
    // }
}
