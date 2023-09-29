package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Admin;
import com.backend.springboot.ecommerce.entity.Import;
import com.backend.springboot.ecommerce.entity.Supplier;
import com.backend.springboot.ecommerce.payload.request.ImportRequestDto;
import com.backend.springboot.ecommerce.payload.response.ImportResponseDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.AdminRepository;
import com.backend.springboot.ecommerce.repository.ImportRepository;
import com.backend.springboot.ecommerce.repository.SupplierRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/import")
public class ImportController {
    @Autowired
    private ImportRepository importRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private AdminRepository adminRepository;

    @GetMapping
    public ResponseEntity<List<Import>> getAllImport() {
        List<Import> imports = importRepository.findAllImport();
        return new ResponseEntity<List<Import>>(imports, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createImport(@RequestBody ImportRequestDto importRequestDto) {
        Optional<Supplier> supplierOptional = supplierRepository.findById(importRequestDto.getSupplier());
        Optional<Admin> adminOptional = adminRepository.findById(importRequestDto.getAdmin());

        if (supplierOptional.isPresent() && adminOptional.isPresent()) {
            Supplier supplier = supplierOptional.get();
            Admin admin = adminOptional.get();
            Import newImport = new Import();
            newImport.setSupplier(supplier);
            newImport.setAdmin(admin);
            newImport.setImportDate(LocalDateTime.now());
            newImport.setImportTotal(importRequestDto.getImportTotal());
            newImport.setImportStatus(1);
            newImport.setImportCreatedAt(LocalDateTime.now());
            newImport.setImportUpdatedAt(LocalDateTime.now());

            Import savedImport = importRepository.save(newImport);
            ImportResponseDto importResponseDto = new ImportResponseDto();
            importResponseDto.setMessage("Add import successfully");
            importResponseDto.setImportObject(savedImport);
            return ResponseEntity.ok(importResponseDto);
        } else {
            return new ResponseEntity<>(new MessageResponse("Supplier or Admin not found!"), HttpStatus.NOT_FOUND);
        }
    }
}
