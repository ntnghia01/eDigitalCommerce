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

import com.backend.springboot.ecommerce.entity.Import;
import com.backend.springboot.ecommerce.entity.Supplier;
import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.payload.request.ImportRequestDto;
import com.backend.springboot.ecommerce.payload.response.ImportResponseDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.ImportRepository;
import com.backend.springboot.ecommerce.repository.SupplierRepository;
import com.backend.springboot.ecommerce.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/import")
public class ImportController {
    @Autowired
    private ImportRepository importRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    // @Autowired
    // private AdminRepository adminRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Import>> getAllImport() {
        List<Import> imports = importRepository.findAllImport();
        return new ResponseEntity<List<Import>>(imports, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createImport(@RequestBody ImportRequestDto importRequestDto) {
        Optional<Supplier> supplierOptional = supplierRepository.findById(importRequestDto.getSupplier());
        Optional<User> userOptional = userRepository.findById(importRequestDto.getUserId());

        if (supplierOptional.isPresent() && userOptional.isPresent()) {
            Supplier supplier = supplierOptional.get();
            User user = userOptional.get();
            Import newImport = new Import();
            newImport.setSupplier(supplier);
            newImport.setUser(user);
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

    @PostMapping("/searchBySupplierName")
    public ResponseEntity<List<Import>> searchImportByName(@RequestBody ImportRequestDto searchData) {
        List<Import> imports;
        if (searchData.getSupplierName() == "") {
            imports = importRepository.findAllImport(); // Lấy tất cả sản phẩm nếu searchData rỗng
        } else {
            imports = importRepository.findImportBySupplierName(searchData.getSupplierName());
        }
        return new ResponseEntity<>(imports, HttpStatus.OK);
    }
}
