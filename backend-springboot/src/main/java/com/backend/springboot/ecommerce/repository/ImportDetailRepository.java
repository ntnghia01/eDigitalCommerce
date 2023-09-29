package com.backend.springboot.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.ImportDetail;

@Repository
public interface ImportDetailRepository extends JpaRepository<ImportDetail, Integer> {
    @Query("SELECT i FROM ImportDetail i WHERE i.importImport.importId = :importId")
    List<ImportDetail> findByImportID(@Param("importId") int ImportId);
}
