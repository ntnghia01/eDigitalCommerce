package com.backend.springboot.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.springboot.ecommerce.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    @Query("SELECT a FROM Admin a WHERE a.adminStatus <> -1")
    List<Admin> findAllAdmin();
}
