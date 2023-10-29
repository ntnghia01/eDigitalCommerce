package com.backend.springboot.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Shipper;
import com.backend.springboot.ecommerce.repository.ShipperRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/shipper")
public class ShipperController {
    
    @Autowired
    private ShipperRepository shipperRepository;

    @GetMapping
    public ResponseEntity<List<Shipper>> getAllShipper() {
        List<Shipper> shippers = shipperRepository.findAllShippers();
        return new ResponseEntity<>(shippers, HttpStatus.OK);
    }

}
