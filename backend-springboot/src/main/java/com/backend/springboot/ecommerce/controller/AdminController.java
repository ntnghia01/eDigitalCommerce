package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.List;

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
import com.backend.springboot.ecommerce.payload.request.AdminRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.AdminRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @Autowired
    private AdminRepository adminRepository;

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmin() {
        List<Admin> adminList = adminRepository.findAllAdmin();
        return new ResponseEntity<>(adminList, HttpStatus.OK);
    };

    @PostMapping
    public ResponseEntity<?> createAdmin(@RequestBody AdminRequestDto adminRequestDto) {
        Admin newAdmin = new Admin();

        newAdmin.setAdminUsername(adminRequestDto.getAdminUsername());
        newAdmin.setAdminPassword(adminRequestDto.getAdminPassword());
        newAdmin.setAdminName(adminRequestDto.getAdminName());
        newAdmin.setAdminEmail(adminRequestDto.getAdminEmail());
        newAdmin.setAdminStatus(1);
        newAdmin.setAdminCreatedAt(LocalDateTime.now());
        newAdmin.setAdminUpdatedAt(LocalDateTime.now());

        adminRepository.save(newAdmin);
        return ResponseEntity.ok(new MessageResponse("Create Admin Successfully"));
    }
}
