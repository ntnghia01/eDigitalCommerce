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

import com.backend.springboot.ecommerce.entity.Customer;
import com.backend.springboot.ecommerce.payload.request.CustomerRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.CustomerRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomer() {
        List<Customer> customers = customerRepository.findAll();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer customerId) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            return new ResponseEntity<Customer>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<Customer>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody CustomerRequestDto customerRequestDto) {
        Customer newCustomer = new Customer();

        newCustomer.setCustomerPhone(customerRequestDto.getCustomerPhone());
        newCustomer.setCustomerPassword(customerRequestDto.getCustomerPassword());
        newCustomer.setCustomerName(customerRequestDto.getCustomerName());
        newCustomer.setCustomerSex(customerRequestDto.getCustomerSex());
        newCustomer.setCustomerEmail(customerRequestDto.getCustomerEmail());
        newCustomer.setCustomerBirthday(customerRequestDto.getCustomerBirthday());
        newCustomer.setCustomerStatus(1);
        newCustomer.setCustomerCreatedAt(LocalDateTime.now());
        newCustomer.setCustomerUpdatedAt(LocalDateTime.now());

        customerRepository.save(newCustomer);
        return ResponseEntity.ok(new MessageResponse("Add customer successfully!"));
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<?> updateCustomer(@PathVariable Integer customerId, @RequestBody CustomerRequestDto customerRequestDto) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);

        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();

            customer.setCustomerPhone(customerRequestDto.getCustomerPhone());
            customer.setCustomerPassword(customerRequestDto.getCustomerPassword());
            customer.setCustomerName(customer.getCustomerName());
            customer.setCustomerSex(customerRequestDto.getCustomerSex());
            customer.setCustomerEmail(customerRequestDto.getCustomerEmail());
            customer.setCustomerBirthday(customer.getCustomerBirthday());
            customer.setCustomerStatus(customerRequestDto.getCustomerStatus());
            customer.setCustomerUpdatedAt(LocalDateTime.now());

            customerRepository.save(customer);
            return ResponseEntity.ok(new MessageResponse("Update customer successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Integer customerId) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            customer.setCustomerStatus(-1);
            customerRepository.save(customer);
            return ResponseEntity.ok(new MessageResponse("Delete customer successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
