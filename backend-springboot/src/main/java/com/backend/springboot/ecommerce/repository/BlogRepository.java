package com.backend.springboot.ecommerce.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    @Query("SELECT b FROM Blog b WHERE b.blogStatus <> -1 ORDER BY b.blogCreatedAt DESC")
    List<Blog> findAllBlog();


    @Query("SELECT b FROM Blog b WHERE b.blogStatus =1 ORDER BY b.blogCreatedAt DESC")
    List<Blog> findAllBlogAvailable();

    @Query("SELECT b FROM Blog b WHERE (b.blogTitle LIKE %:blogTitle% OR b.blogContent LIKE %:blogTitle% OR b.user.userName LIKE %:blogTitle%) AND b.blogStatus <> -1")
    List<Blog> findBlogByTitle(@Param("blogTitle") String blogTitle);

    @Query("SELECT b FROM Blog b WHERE (b.blogTitle LIKE %:blogTitle% OR b.blogContent LIKE %:blogTitle% OR b.user.userName LIKE %:blogTitle%) AND b.blogStatus = 1")
    List<Blog> findBlogAvailalbeByTitle(@Param("blogTitle") String blogTitle);
}
