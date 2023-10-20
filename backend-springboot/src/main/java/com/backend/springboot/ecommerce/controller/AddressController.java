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

import com.backend.springboot.ecommerce.entity.Address;
import com.backend.springboot.ecommerce.entity.Customer;
import com.backend.springboot.ecommerce.payload.request.AddressRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.AddressRepository;
import com.backend.springboot.ecommerce.repository.CustomerRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/address")
public class AddressController {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public ResponseEntity<List<Address>> getAllAddress() {
        List<Address> addresses = addressRepository.findAll();
        return new ResponseEntity<List<Address>>(addresses, HttpStatus.OK);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<List<Address>> getAddressByCustomerID(@PathVariable Integer customerId) {
        List<Address> addresses = addressRepository.findByCustomerID(customerId);
        return new ResponseEntity<List<Address>>(addresses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createAddress(@RequestBody AddressRequestDto addressRequestDto) {
        Optional<Customer> customerOptional = customerRepository.findById(addressRequestDto.getCustomer());

        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            Address newAddress = new Address();
            newAddress.setCustomer(customer);
            newAddress.setAddressName(addressRequestDto.getAddressName());
            newAddress.setAddressPhone(addressRequestDto.getAddressPhone());
            newAddress.setAddressFull(addressRequestDto.getAddressFull());
            newAddress.setAddressStatus(1);
            newAddress.setAddressCreatedAt(LocalDateTime.now());
            newAddress.setAddressUpdatedAt(LocalDateTime.now());

            addressRepository.save(newAddress);

            return ResponseEntity.ok(new MessageResponse("Add address successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Customer not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<?> updateAddress(@PathVariable Integer addressId, @RequestBody AddressRequestDto addressRequestDto) {
        Optional<Address> addressOptional = addressRepository.findById(addressId);
        if (addressOptional.isPresent()) {
            Address existingAddress = addressOptional.get();
            existingAddress.setAddressName(addressRequestDto.getAddressName());
            existingAddress.setAddressPhone(addressRequestDto.getAddressPhone());
            existingAddress.setAddressFull(addressRequestDto.getAddressFull());
            addressRepository.save(existingAddress);
            return ResponseEntity.ok(new MessageResponse("Update address successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Address not exist!"), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<?> deleteAddress(@PathVariable Integer addressId) {
        Optional<Address> addressOptional = addressRepository.findById(addressId);
        if (addressOptional.isPresent()) {
            Address existingAddress = addressOptional.get();
            existingAddress.setAddressStatus(-1);
            addressRepository.save(existingAddress);
            return ResponseEntity.ok(new MessageResponse("Delete address successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Address not exist!"), HttpStatus.NOT_FOUND);
        }
    }
}
