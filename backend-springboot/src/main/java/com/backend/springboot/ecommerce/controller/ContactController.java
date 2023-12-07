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

    @PostMapping("/search")
    public ResponseEntity<List<Contact>> searchContact(@RequestBody ContactRequestDto searchData) {
        List<Contact> contacts;
        if (searchData.getContactContent() == "") {
            contacts = contactRepository.findAllContact();
        } else {
            contacts = contactRepository.findContactBySearch(searchData.getContactContent());
        }
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @PutMapping("/confirm/{contactId}")
    public ResponseEntity<?> confirmContact(@PathVariable Integer contactId) {
        Optional<Contact> contacOptional = contactRepository.findById(contactId);
        if (contacOptional.isPresent()) {
            Contact contact = contacOptional.get();
            contact.setContactStatus(2);
            contact.setContactUpdatedAt(LocalDateTime.now());
            contactRepository.save(contact);
            System.out.println("Confirm contact: " + contact.getContactId());
            return ResponseEntity.ok(new MessageResponse("Confirm Contact successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Contact not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{contactId}")
    public ResponseEntity<?> deleteContact(@PathVariable Integer contactId) {
        Optional<Contact> contacOptional = contactRepository.findById(contactId);
        if (contacOptional.isPresent()) {
            Contact contact = contacOptional.get();
            contact.setContactStatus(-1);
            contact.setContactUpdatedAt(LocalDateTime.now());
            contactRepository.save(contact);
            System.out.println("delete contact: " + contact.getContactId());
            return ResponseEntity.ok(new MessageResponse("delete Contact successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Contact not found!"), HttpStatus.NOT_FOUND);
        }
    }

}
