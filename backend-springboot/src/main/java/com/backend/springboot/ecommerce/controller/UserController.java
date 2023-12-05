package com.backend.springboot.ecommerce.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.payload.request.AvatarRequestDto;
import com.backend.springboot.ecommerce.payload.request.UserRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/account")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload.directory}")
    private String uploadDirectory;

    @GetMapping("/customer")
    public ResponseEntity<List<User>> getAllCustomer() {
        List<User> customers = userRepository.findAllCustomer();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    
    @GetMapping("/admin")
    public ResponseEntity<List<User>> getAllAdmin() {
        List<User> admins = userRepository.findAllAdmin();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    
    @GetMapping("/shipper")
    public ResponseEntity<List<User>> getAllShipper() {
        List<User> shippers = userRepository.findAllShipper();
        return new ResponseEntity<>(shippers, HttpStatus.OK);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<User> getCustomerById(@PathVariable Integer customerId) {
        Optional<User> customerOptional = userRepository.findById(customerId);
        if (customerOptional.isPresent()) {
            User customer = customerOptional.get();
            return new ResponseEntity<User>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> disableCustomerAccount(@PathVariable Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User customer = userOptional.get();
            customer.setUserStatus(0);
            userRepository.save(customer);
            return ResponseEntity.ok(new MessageResponse("Disable customer account successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/active/{userId}")
    public ResponseEntity<?> activeCustomerAccount(@PathVariable Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User customer = userOptional.get();
            customer.setUserStatus(1);
            userRepository.save(customer);
            return ResponseEntity.ok(new MessageResponse("Active customer account successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @PutMapping("/{customerId}")
    public ResponseEntity<?> updateCustomer(@PathVariable Integer customerId, @RequestBody UserRequestDto customerRequestDto) {
        Optional<User> customerOptional = userRepository.findById(customerId);

        if (customerOptional.isPresent()) {
            Optional<User> userExisted = userRepository.findUserByPhoneExcludingUserId(customerId, customerRequestDto.getUserPhone());
            Optional<User> userEmailExisted = userRepository.findUserByEmailExcludingUserId(customerId, customerRequestDto.getUserEmail());
            if (userExisted.isPresent() || userEmailExisted.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                User customer = customerOptional.get();
                customer.setUserPhone(customerRequestDto.getUserPhone());
                // customer.setUserPassword(customerRequestDto.getUserPassword());
                customer.setUserName(customerRequestDto.getUserName());
                customer.setUserSex(customerRequestDto.getUserSex());
                customer.setUserEmail(customerRequestDto.getUserEmail());
                customer.setUserBirthday(customerRequestDto.getUserBirthday());
                customer.setUserStatus(customerRequestDto.getUserStatus());
                customer.setUserUpdatedAt(LocalDateTime.now());

                userRepository.save(customer);
                return ResponseEntity.ok(new MessageResponse("Update customer successfully!"));
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/avatar/{userId}")
    public ResponseEntity<?> uploadAvatar(@PathVariable Integer userId, @ModelAttribute AvatarRequestDto avatarRequestDto) {
        System.out.println(userId);
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            try {
                // Luu tep hinh anh vao thu muc uploads
                // if (avatarRequestDto.getImage() != null) {
                    MultipartFile imageFile = avatarRequestDto.getImage();
                    // String fileName = imageFile.getOriginalFilename();
                    String originalFileName = imageFile.getOriginalFilename();
                    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                    String fileName = "avatar_" + System.currentTimeMillis() + fileExtension;
                    Path uploadPath = Paths.get(uploadDirectory, fileName);
                    imageFile.transferTo(uploadPath.toFile());
                    // Luu ten tep vao productRequestDto
                    avatarRequestDto.setUserImage(fileName);
                // }
            } catch (IOException e) {
                return new ResponseEntity<>(new MessageResponse("Failed to upload avatar"), HttpStatus.NOT_FOUND);
            }
            user.setUserImage(avatarRequestDto.getUserImage());
            userRepository.save(user);
            return ResponseEntity.ok(new MessageResponse("Upload avatar successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Upload avatar failed"), HttpStatus.BAD_REQUEST);
        }
    }


}
