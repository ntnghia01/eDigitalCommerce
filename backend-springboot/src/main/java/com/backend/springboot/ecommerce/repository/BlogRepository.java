package com.backend.springboot.ecommerce.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    @Query("SELECT b FROM Blog b WHERE b.blogStatus <> -1 ORDER BY b.blogCreatedAt DESC")
    List<Blog> findAllBlog();
}
