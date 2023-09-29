package com.backend.springboot.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.springboot.ecommerce.entity.Import;

public interface ImportRepository extends JpaRepository<Import, Integer> {
    @Query("SELECT i FROM Import i WHERE i.importStatus <> -1")
    List<Import> findAllImport();
}
