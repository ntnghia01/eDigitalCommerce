package com.backend.springboot.ecommerce.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {
    @Query("SELECT c FROM Contact c WHERE c.contactStatus <> -1 ORDER BY c.contactCreatedAt DESC")
    List<Contact> findAllContact();
}
