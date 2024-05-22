package com.backend.springboot.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query("SELECT c FROM Comment c ORDER BY c.cmtTime DESC")
    List<Comment> findComments();

    @Query("SELECT c FROM Comment c WHERE c.product.proId = :proId AND c.cmtStatus = 1 ORDER BY c.cmtTime DESC")
    List<Comment> findCommentByProductID(@Param("proId") int proId);

    @Query("SELECT b FROM Comment b WHERE (b.cmtContent LIKE %:cmtContent% OR b.product.proName LIKE %:cmtContent% OR b.user.userName LIKE %:cmtContent%) AND b.cmtStatus <> -1")
    List<Comment> findCommentByContent(@Param("cmtContent") String cmtContent);


}
