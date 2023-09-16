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

import com.backend.springboot.ecommerce.entity.Supplier;
import com.backend.springboot.ecommerce.payload.request.SupplierRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.SupplierRepository;

@CrossOrigin(origins = "*", maxAge = 3600, allowCredentials = "false")
@RestController
@RequestMapping("/api/supplier")
public class SupplierController {
    
    @Autowired
    private SupplierRepository supplierRepository;

    @GetMapping
    public ResponseEntity<List<Supplier>> getAllSupplier() {
        List<Supplier> supplierList = supplierRepository.findAllSupplier();
        return new ResponseEntity<>(supplierList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createSupplier(@RequestBody SupplierRequestDto supplierRequestDto) {
        Supplier supplier = new Supplier(supplierRequestDto.getSupplierName(), supplierRequestDto.getSupplierEmail(), supplierRequestDto.getSupplierPhone(), supplierRequestDto.getSupplierAddress());
        supplierRepository.save(supplier);
        return ResponseEntity.ok(new MessageResponse("Add supplier successfully!"));
    }

    @PutMapping("/{supplierId}")
    public ResponseEntity<?> updateSupplier(@PathVariable Integer supplierId, @RequestBody SupplierRequestDto supplierRequestDto) {
        Optional<Supplier> supplierOptional = supplierRepository.findById(supplierId);
        if (supplierOptional.isPresent()) {
            Supplier existingSupplier = supplierOptional.get();
            existingSupplier.setSupplierName(supplierRequestDto.getSupplierName());
            existingSupplier.setSupplierEmail(supplierRequestDto.getSupplierEmail());
            existingSupplier.setSupplierPhone(supplierRequestDto.getSupplierPhone());
            existingSupplier.setSupplierAddress(supplierRequestDto.getSupplierAddress());
            existingSupplier.setSupplierStatus(supplierRequestDto.getSupplierStatus());
            existingSupplier.setSupplierUpdatedAt(LocalDateTime.now());

            supplierRepository.save(existingSupplier);
            return ResponseEntity.ok(new MessageResponse("Update supplier successfully!"));
        } {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{supplierId}")
    public ResponseEntity<?> deleteSupplier(@PathVariable Integer supplierId) {
        Optional<Supplier> supplierOptional = supplierRepository.findById(supplierId);
        if (supplierOptional.isPresent()) {
            Supplier existingSupplier = supplierOptional.get();
            existingSupplier.setSupplierStatus(-1);
            existingSupplier.setSupplierUpdatedAt(LocalDateTime.now());

            supplierRepository.save(existingSupplier);
            return ResponseEntity.ok(new MessageResponse("Delete supplier successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
