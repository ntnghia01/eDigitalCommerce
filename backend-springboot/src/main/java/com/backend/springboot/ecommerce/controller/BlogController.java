package com.backend.springboot.ecommerce.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.springboot.ecommerce.entity.Blog;
import com.backend.springboot.ecommerce.entity.Brand;
import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.payload.request.BlogRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.BlogRepository;
import com.backend.springboot.ecommerce.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/blog")
public class BlogController {
    
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload.directory}")
    private String uploadDirectory;

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlog() {
        List<Blog> blogs = blogRepository.findAllBlog();
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    @GetMapping("/{blogId}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Integer blogId) {
        Optional<Blog> blogOptional = blogRepository.findById(blogId);
        if (blogOptional.isPresent()) {
            Blog blog = blogOptional.get();
            return new ResponseEntity<>(blog, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/available")
    public ResponseEntity<List<Blog>> getAllBlogAvailable() {
        List<Blog> blogs = blogRepository.findAllBlogAvailable();
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createBlog(@ModelAttribute BlogRequestDto blogRequestDto) {
        Optional<User> userOptional = userRepository.findById(blogRequestDto.getUserId());
        if (userOptional.isPresent()) {

            User user = userOptional.get();

            try {
                // Luu tep hinh anh vao thu muc uploads
                if (blogRequestDto.getImage() != null) {
                    MultipartFile imageFile = blogRequestDto.getImage();

                    // String fileName = imageFile.getOriginalFilename();
                    String originalFileName = imageFile.getOriginalFilename();
                    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                    String fileName = "blog_" + System.currentTimeMillis() + fileExtension;

                    Path uploadPath = Paths.get(uploadDirectory, fileName);
                    imageFile.transferTo(uploadPath.toFile());

                    // Luu ten tep vao blogRequestDto
                    blogRequestDto.setBlogImage(fileName);
                }
            } catch (IOException e) {
                return new ResponseEntity<>(new MessageResponse("Failed to upload blog image"), HttpStatus.NOT_FOUND);
            }


            Blog newBlog = new Blog();

            newBlog.setUser(user);
            newBlog.setBlogTitle(blogRequestDto.getBlogTitle());
            newBlog.setBlogContent(blogRequestDto.getBlogContent());
            newBlog.setBlogStatus(1);
            newBlog.setBlogCreatedAt(LocalDateTime.now());
            newBlog.setBlogUpdatedAt(LocalDateTime.now());
            newBlog.setBlogImage(blogRequestDto.getBlogImage());

            blogRepository.save(newBlog);
            return ResponseEntity.ok(new MessageResponse("Add Blog successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Add Blog failed"), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{blogId}")
    public ResponseEntity<?> updateBlog(@PathVariable Integer blogId, @ModelAttribute BlogRequestDto blogRequestDto) {
        Optional<Blog> blogOptional = blogRepository.findById(blogId);

        if (blogOptional.isPresent() ) {
            Blog blog = blogOptional.get();

            try {
                // Luu tep hinh anh vao thu muc uploads
                if (blogRequestDto.getImage() != null) {
                    MultipartFile imageFile = blogRequestDto.getImage();

                    // String fileName = imageFile.getOriginalFilename();
                    String originalFileName = imageFile.getOriginalFilename();
                    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                    String fileName = "blog_" + System.currentTimeMillis() + fileExtension;

                    Path uploadPath = Paths.get(uploadDirectory, fileName);
                    imageFile.transferTo(uploadPath.toFile());

                    // Luu ten tep vao blogRequestDto
                    blogRequestDto.setBlogImage(fileName);

                    // Delete Old Image
                    String oldImageFileName = blog.getBlogImage();
                    if (oldImageFileName != null) {
                        Path oldImagePath = Paths.get(uploadDirectory, oldImageFileName);
                        Files.delete(oldImagePath);
                    }
                }
            } catch (IOException e) {
                
            }

            blog.setBlogTitle(blogRequestDto.getBlogTitle());
            blog.setBlogContent(blogRequestDto.getBlogContent());
            blog.setBlogImage(blogRequestDto.getBlogImage());
            blog.setBlogStatus(blogRequestDto.getBlogStatus());
            blog.setBlogUpdatedAt(LocalDateTime.now());

            blogRepository.save(blog);
            return ResponseEntity.ok(new MessageResponse("Update blog successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/searchByTitle")
    public ResponseEntity<List<Blog>> searchBlogByTitle(@RequestBody BlogRequestDto searchData) {
        List<Blog> blogs;
        if (searchData.getBlogTitle() == "") {
            blogs = blogRepository.findAllBlog();
        } else {
            blogs = blogRepository.findBlogByTitle(searchData.getBlogTitle());
        }
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    @PostMapping("/available/searchByTitle")
    public ResponseEntity<List<Blog>> searchBlogAvailableByTitle(@RequestBody BlogRequestDto searchData) {
        List<Blog> blogs;
        if (searchData.getBlogTitle() == "") {
            blogs = blogRepository.findAllBlog();
        } else {
            blogs = blogRepository.findBlogAvailalbeByTitle(searchData.getBlogTitle());
        }
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{blogId}")
    public ResponseEntity<?> deleteBlog(@PathVariable Integer blogId) {
        Optional<Blog> blogOptional = blogRepository.findById(blogId);
        if (blogOptional.isPresent()) {
            Blog blog = blogOptional.get();
            blog.setBlogStatus(-1);
            blog.setBlogUpdatedAt(LocalDateTime.now());
            blogRepository.save(blog);
            System.out.println("delete blog: " + blog.getBlogId());
            return ResponseEntity.ok(new MessageResponse("delete Blog successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Blog not found!"), HttpStatus.NOT_FOUND);
        }
    }

}
