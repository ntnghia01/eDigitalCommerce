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

    @Query(value = "SELECT COUNT(r.review_rate), rates.rate " +
                   "FROM (SELECT 1 AS rate UNION SELECT 2 AS rate UNION SELECT 3 AS rate UNION SELECT 4 AS rate UNION SELECT 5 AS rate) AS rates " +
                   "LEFT JOIN tbl_review r ON rates.rate = r.review_rate AND r.review_status = :status " +
                   "GROUP BY rates.rate", nativeQuery = true)
    List<Object[]> countReviewsByRateIncludingZero(@Param("status") int status);
}
