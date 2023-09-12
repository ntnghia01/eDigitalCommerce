package com.backend.springboot.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    
}