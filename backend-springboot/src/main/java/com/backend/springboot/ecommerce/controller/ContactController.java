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
import com.backend.springboot.ecommerce.entity.Contact;
import com.backend.springboot.ecommerce.payload.request.ContactRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.ContactRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/contact")
public class ContactController {
    
    @Autowired
    private ContactRepository contactRepository;

    @GetMapping
    public ResponseEntity<List<Contact>> getAllContact() {
        List<Contact> contacts = contactRepository.findAllContact();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createContact(@RequestBody ContactRequestDto contactRequestDto) {

            Contact newContact = new Contact();
            newContact.setContactUsername(contactRequestDto.getContactUsername());
            newContact.setContactUserphone(contactRequestDto.getContactUserphone());
            newContact.setContactUserEmail(contactRequestDto.getContactUseremail());
            newContact.setContactTitle(contactRequestDto.getContactTitle());
            newContact.setContactContent(contactRequestDto.getContactContent());
            newContact.setContactStatus(1);
            newContact.setContactCreatedAt(LocalDateTime.now());
            newContact.setContactUpdatedAt(LocalDateTime.now());

            contactRepository.save(newContact);
            return ResponseEntity.ok(new MessageResponse("Add contact successfully!"));
    }

}
