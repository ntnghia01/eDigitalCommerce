package com.backend.springboot.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("SELECT b FROM Review b WHERE (b.reviewContent LIKE %:reviewContent% OR b.user.userName LIKE %:reviewContent%) AND b.reviewStatus <> -1")
    List<Review> findReviewByContent(@Param("reviewContent") String reviewContent);
}
