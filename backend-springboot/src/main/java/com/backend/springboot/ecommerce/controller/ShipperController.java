package com.backend.springboot.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/shipper")
public class ShipperController {
    
    // @Autowired
    // private ShipperRepository shipperRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllShipper() {
        List<User> shippers = userRepository.findAllShipperAvailable();
        return new ResponseEntity<>(shippers, HttpStatus.OK);
    }

}
