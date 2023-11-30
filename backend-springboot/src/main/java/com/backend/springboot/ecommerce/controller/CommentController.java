package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Comment;
import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.entity.Product;
import com.backend.springboot.ecommerce.payload.request.CommentRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.CommentRepository;
import com.backend.springboot.ecommerce.repository.UserRepository;
import com.backend.springboot.ecommerce.repository.ProductRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository customerRepository;

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComment() {
        List<Comment> comments = commentRepository.findComments();
        return new ResponseEntity<List<Comment>>(comments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createComment(@RequestBody CommentRequestDto commentRequestDto) {
        Optional<Product> productOptional = productRepository.findById(commentRequestDto.getProduct());
        Optional<User> customerOptional = customerRepository.findById(commentRequestDto.getCustomer());

        if (productOptional.isPresent() && customerOptional.isPresent()) {
            Product product = productOptional.get();
            User customer = customerOptional.get();
            Comment newComment = new Comment();
            newComment.setProduct(product);
            newComment.setUser(customer);
            newComment.setCmtTime(LocalDateTime.now());
            // newComment.setCmtRate(commentRequestDto.getCmtRate());
            newComment.setCmtContent(commentRequestDto.getCmtContent());
            newComment.setCmtStatus(1);
            newComment.setCmtCreatedAt(LocalDateTime.now());
            newComment.setCmtUpdatedAt(LocalDateTime.now());

            commentRepository.save(newComment);
            return ResponseEntity.ok(new MessageResponse("Add comment successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Product or Customer not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> disableComment(@PathVariable Integer commentId) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            comment.setCmtStatus(0);
            commentRepository.save(comment);
            return ResponseEntity.ok(new MessageResponse("Disable comment successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/active/{commentId}")
    public ResponseEntity<?> activeComment(@PathVariable Integer commentId) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            comment.setCmtStatus(1);
            commentRepository.save(comment);
            return ResponseEntity.ok(new MessageResponse("Active comment successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product/{proId}")
    public ResponseEntity<List<Comment>> getCommentByProductID(@PathVariable Integer proId) {
        List<Comment> comments = commentRepository.findCommentByProductID(proId);
        return new ResponseEntity<List<Comment>>(comments, HttpStatus.OK);
    }
}
