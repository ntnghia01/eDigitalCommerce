package com.backend.springboot.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Cart;
import com.backend.springboot.ecommerce.entity.CartDetail;
import com.backend.springboot.ecommerce.entity.Product;
import com.backend.springboot.ecommerce.payload.request.CartDetailRequestDto;
import com.backend.springboot.ecommerce.payload.response.CartResponseDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.CartDetailRepository;
import com.backend.springboot.ecommerce.repository.CartRepository;
import com.backend.springboot.ecommerce.repository.ProductRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<List<CartDetail>> getAllCartDetail() {
        List<CartDetail> cartDetails = cartDetailRepository.findAll();
        return new ResponseEntity<>(cartDetails, HttpStatus.OK);
    }

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

    @GetMapping("/{customerId}")
    public ResponseEntity<List<CartDetail>> getCartDetailByCustomerID(@PathVariable Integer customerId) {
        List<CartDetail> cartDetails = cartDetailRepository.findCartDetailByCustomerID(customerId);
        return new ResponseEntity<List<CartDetail>>(cartDetails, HttpStatus.OK);
    }

    @PostMapping("/updateQuantity")
    public ResponseEntity<?> updateCartDetailQuantity(@RequestBody CartDetailRequestDto cartDetailRequestDto) {
        Optional<CartDetail> cartDetailOptional = cartDetailRepository.findById(cartDetailRequestDto.getCartDetailId());
        CartDetail cartDetail = cartDetailOptional.get();
        cartDetail.setCartDetailQuantity(cartDetailRequestDto.getCartDetailQuantity());
        cartDetailRepository.save(cartDetail);
        return ResponseEntity.ok(new MessageResponse("Update cart detail successfully!"));
    }

    @DeleteMapping("/cartdetail/{cartDetailId}")
    public ResponseEntity<?> deleteCartDetail(@PathVariable Integer cartDetailId) {
        Optional<CartDetail> cartDetailOptional = cartDetailRepository.findById(cartDetailId);
        if (cartDetailOptional.isPresent()) {
            CartDetail cartDetail = cartDetailOptional.get();
            cartDetailRepository.delete(cartDetail);
            return ResponseEntity.ok(new MessageResponse("Delete product in cart successfully"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Product in cart not existed"), HttpStatus.NOT_FOUND);
        }
        
    }

    @GetMapping("/calculate/{customerId}")
    public ResponseEntity<?> calculateCart (@PathVariable Integer customerId) {
        List<CartDetail> cartDetails = cartDetailRepository.findCartDetailByCustomerID(customerId);

        int total = 0;
        int quantityItem = 0;
        int totalQuantityItem = 0;

        for (CartDetail cartDetail : cartDetails) {
            total += cartDetail.getProduct().getProPrice()*cartDetail.getCartDetailQuantity(); // Cộng giá của từng CartDetail vào tổng giá
            quantityItem ++;
            totalQuantityItem += cartDetail.getCartDetailQuantity();
        }

        CartResponseDto cartResponseDto = new CartResponseDto();
        cartResponseDto.setTotalMoney(total);
        cartResponseDto.setQuantityItem(quantityItem);
        cartResponseDto.setTotalQuantityItem(totalQuantityItem);
        
        return ResponseEntity.ok(cartResponseDto);
    }

    @PostMapping("/cartDetail/search")
    public ResponseEntity<List<CartDetail>> searchCart(@RequestBody CartDetailRequestDto searchData) {
        List<CartDetail> cartDetails;
        if (searchData.getSearch() == "") {
            cartDetails = cartDetailRepository.findCartDetailByCustomerID(searchData.getCartId());
        } else {
            cartDetails = cartDetailRepository.searchCartDetail(searchData.getCartId(), searchData.getSearch());
        }
        return new ResponseEntity<>(cartDetails, HttpStatus.OK);
    }

}
