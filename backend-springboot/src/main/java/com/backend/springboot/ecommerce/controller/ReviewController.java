package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Order;
import com.backend.springboot.ecommerce.entity.Review;
import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.payload.request.ReviewRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.OrderRepository;
import com.backend.springboot.ecommerce.repository.ReviewRepository;
import com.backend.springboot.ecommerce.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/review")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Review>> getAllReview() {
        List<Review> reviews = reviewRepository.findAll();
        return new ResponseEntity<List<Review>>(reviews, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewRequestDto reviewRequestDto) {
        Optional<Order> orderOptional = orderRepository.findById(reviewRequestDto.getOrder());
        Optional<User> userOptional = userRepository.findById(reviewRequestDto.getUser());

        if (orderOptional.isPresent() && userOptional.isPresent()) {
            Order order = orderOptional.get();
            User user = userOptional.get();
            Review newReview = new Review();
            newReview.setOrder(order);
            newReview.setUser(user);
            newReview.setReviewTime(LocalDateTime.now());
            newReview.setReviewRate(reviewRequestDto.getReviewRate());
            newReview.setReviewContent(reviewRequestDto.getReviewContent());
            newReview.setReviewStatus(1);
            newReview.setReviewCreatedAt(LocalDateTime.now());
            newReview.setReviewUpdatedAt(LocalDateTime.now());

            reviewRepository.save(newReview);
            return ResponseEntity.ok(new MessageResponse("Add review successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Order or User not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/searchByContent")
    public ResponseEntity<List<Review>> searchReviewByContent(@RequestBody ReviewRequestDto searchData) {
        List<Review> reviews;
        if (searchData.getReviewContent() == "") {
            reviews = reviewRepository.findAll(); // Lấy tất cả sản phẩm nếu searchData rỗng
        } else {
            reviews = reviewRepository.findReviewByContent(searchData.getReviewContent());
        }
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }
}
