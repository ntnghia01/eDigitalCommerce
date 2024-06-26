package com.backend.springboot.ecommerce.controller;

import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.BrandRepository;

import com.backend.springboot.ecommerce.entity.Brand;
import com.backend.springboot.ecommerce.payload.request.BrandRequestDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/brand")
public class BrandController {

    @Autowired
    private BrandRepository brandRepository;

    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brandList = brandRepository.findAllBrand();
        return new ResponseEntity<>(brandList, HttpStatus.OK);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Brand>> getAllBrandsAvailable() {
        List<Brand> brands = brandRepository.findAllBrandAvailable();
        return new ResponseEntity<>(brands, HttpStatus.OK);
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
        Brand brand = new Brand(brandRequestDto.getBrandName(), brandRequestDto.getBrandDesc(), brandRequestDto.getBrandImage());
        brandRepository.save(brand);
        return ResponseEntity.ok(new MessageResponse("Add brand successfully!!!"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBrand(@PathVariable Integer id, @RequestBody BrandRequestDto brandRequestDto) {
        Optional<Brand> brandEntityOptional = brandRepository.findById(id);
        if (brandEntityOptional.isPresent()) {
            Brand existingBrand = brandEntityOptional.get();
            existingBrand.setBrandName(brandRequestDto.getBrandName());
            existingBrand.setBrandDesc(brandRequestDto.getBrandDesc());
            existingBrand.setBrandStatus(brandRequestDto.getBrandStatus());
            existingBrand.setBrandUpdatedAt(LocalDateTime.now());
            existingBrand.setBrandImage(brandRequestDto.getBrandImage());

            brandRepository.save(existingBrand);
            return ResponseEntity.ok(new MessageResponse("Update brand successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{brandId}")
    public ResponseEntity<?> deleteBrand(@PathVariable Integer brandId) {
        Optional<Brand> brandOptional = brandRepository.findById(brandId);
        if (brandOptional.isPresent()) {
            Brand existingBrand = brandOptional.get();
            existingBrand.setBrandStatus(-1);
            existingBrand.setBrandUpdatedAt(LocalDateTime.now());

            brandRepository.save(existingBrand);
            return ResponseEntity.ok(new MessageResponse("Delete brand successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // @DeleteMapping("/{brandId}")
    // public ResponseEntity<?> deleteBrandOld(@PathVariable Integer brandId) {
    //     Optional<Brand> brandEntityOptional = brandRepository.findById(brandId);
    //     if (brandEntityOptional.isPresent()) {
    //         brandRepository.deleteById(brandId);
    //         return ResponseEntity.ok(new MessageResponse("Delete brand successfully!"));
    //     } else {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    // }
    @PostMapping("/searchByName")
    public ResponseEntity<List<Brand>> searchBrandByName(@RequestBody BrandRequestDto searchData) {
        List<Brand> brands;
        if (searchData.getBrandName() == "") {
            brands = brandRepository.findAllBrand(); // Lấy tất cả sản phẩm nếu searchData rỗng
        } else {
            brands = brandRepository.findBrandByName(searchData.getBrandName());
        }
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }

}
