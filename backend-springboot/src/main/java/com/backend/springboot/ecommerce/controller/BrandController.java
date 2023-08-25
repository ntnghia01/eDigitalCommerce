package com.backend.springboot.ecommerce.controller;

import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.BrandRepository;

import com.backend.springboot.ecommerce.entity.Brand;
import com.backend.springboot.ecommerce.payload.request.BrandRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600, allowCredentials="false")
@RestController
@RequestMapping("/api/brands")
public class BrandController {

    @Autowired
    private BrandRepository brandRepository;

    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brandList = brandRepository.findAll();
        return new ResponseEntity<>(brandList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable Integer id) {
        Optional<Brand> brandOptional = brandRepository.findById(id);
        if (brandOptional.isPresent()) {
            Brand brand = brandOptional.get();
            return new ResponseEntity<>(brand, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createBrand(@RequestBody BrandRequestDto brandRequestDto) {
        Brand brand = new Brand(brandRequestDto.getBrandName());
        brandRepository.save(brand);
        return ResponseEntity.ok(new MessageResponse("Add brand successfully!!!"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBrand(@PathVariable Integer id, @RequestBody BrandRequestDto brandRequestDto) {
        Optional<Brand> brandEntityOptional = brandRepository.findById(id);
        if (brandEntityOptional.isPresent()) {
            Brand existingBrand = brandEntityOptional.get();
            existingBrand.setBrandName(brandRequestDto.getBrandName());

            brandRepository.save(existingBrand);
            return ResponseEntity.ok(new MessageResponse("Update brand successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBrand(@PathVariable Integer id) {
        Optional<Brand> brandEntityOptional = brandRepository.findById(id);
        if (brandEntityOptional.isPresent()) {
            brandRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Delete brand successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
