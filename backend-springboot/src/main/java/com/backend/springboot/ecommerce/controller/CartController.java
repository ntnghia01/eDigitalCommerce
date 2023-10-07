package com.backend.springboot.ecommerce.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Cart;
import com.backend.springboot.ecommerce.entity.CartDetail;
import com.backend.springboot.ecommerce.entity.Product;
import com.backend.springboot.ecommerce.payload.request.CartDetailRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.CartDetailRepository;
import com.backend.springboot.ecommerce.repository.CartRepository;
import com.backend.springboot.ecommerce.repository.ProductRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/cartdetail")
    public ResponseEntity<?> createCartDetail(@RequestBody CartDetailRequestDto cartDetailRequestDto) {
        Optional<Cart> cartOptional = cartRepository.findCartByCustomerID(cartDetailRequestDto.getCustomerId());
        Optional<Product> productOptional = productRepository.findById(cartDetailRequestDto.getProId());
        Optional<CartDetail> cartDetailOptional = cartDetailRepository.existedProduct(cartOptional.get().getCartId(), cartDetailRequestDto.getProId());
        if (cartOptional.isPresent() && productOptional.isPresent()) {
            if (cartDetailOptional.isPresent()) {
                CartDetail cartDetail = cartDetailOptional.get();
                cartDetail.setCartDetailQuantity(cartDetail.getCartDetailQuantity() + cartDetailRequestDto.getCartDetailQuantity());
                cartDetailRepository.save(cartDetail);
                return ResponseEntity.ok(new MessageResponse("Update product quantity in cart successfully!"));
            } else {
                Cart cart = cartOptional.get();
                Product product = productOptional.get();

                CartDetail newCartDetail = new CartDetail();
                newCartDetail.setCart(cart);
                newCartDetail.setProduct(product);
                newCartDetail.setCartDetailQuantity(cartDetailRequestDto.getCartDetailQuantity());

                cartDetailRepository.save(newCartDetail);
                return ResponseEntity.ok(new MessageResponse("Add cart detail successfully!"));
            }
        } else {
            return new ResponseEntity<>(new MessageResponse("Cart or Product not found"), HttpStatus.NOT_FOUND);
        }
    }

}
