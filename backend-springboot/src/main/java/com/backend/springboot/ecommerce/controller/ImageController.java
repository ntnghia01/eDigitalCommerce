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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.springboot.ecommerce.entity.Image;
import com.backend.springboot.ecommerce.entity.Product;
import com.backend.springboot.ecommerce.payload.request.ImageRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.ImageRepository;
import com.backend.springboot.ecommerce.repository.ProductRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/image")
public class ImageController {
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;

    @Value("${file.upload.directory}")
    private String uploadDirectory;

    @GetMapping("/{proId}")
    public ResponseEntity<List<Image>> getImageByProductID(@PathVariable Integer proId) {
        List<Image> images = imageRepository.findAllImageByProductID(proId);
        return new ResponseEntity<List<Image>>(images, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addImage(@ModelAttribute ImageRequestDto imageRequestDto) {
        Optional<Product> productOptional = productRepository.findById(imageRequestDto.getProId());
        if(productOptional.isPresent()) {
            Product product = productOptional.get();
            try {
                if (imageRequestDto.getImage() != null) {
                    MultipartFile imageFile = imageRequestDto.getImage();

                    // String fileName = imageFile.getOriginalFilename();
                    String originalFileName = imageFile.getOriginalFilename();
                    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                    String fileName = "image_" + System.currentTimeMillis() + fileExtension;

                    Path uploadPath = Paths.get(uploadDirectory, fileName);
                    imageFile.transferTo(uploadPath.toFile());

                    // Luu ten tep vao blogRequestDto
                    imageRequestDto.setImageImage(fileName);
                }
            } catch (IOException e) {
                return new ResponseEntity<>(new MessageResponse("Failed to upload image of product"), HttpStatus.NOT_FOUND);
            }

            Image newImage = new Image();
            newImage.setProduct(product);
            newImage.setImage(imageRequestDto.getImageImage());
            newImage.setImageCreatedAt(LocalDateTime.now());
            newImage.setImageUpdatedAt(LocalDateTime.now());

            imageRepository.save(newImage);
            return ResponseEntity.ok(new MessageResponse("Add Image successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Add Image failed"), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{imageId}")
    public ResponseEntity<?> deleteImage(@PathVariable Integer imageId) {
        Optional<Image> imageOptional = imageRepository.findById(imageId);
        if (imageOptional.isPresent()) {
            Image image = imageOptional.get();

            String oldImageFileName = image.getImage();
            try {
                if (oldImageFileName != null) {
                        Path oldImagePath = Paths.get(uploadDirectory, oldImageFileName);
                        Files.delete(oldImagePath);
                    }
            } catch (Exception e) {
                System.err.println(e);
            }
                    
            
            imageRepository.delete(image);

            

            return ResponseEntity.ok(new MessageResponse("Delete image successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
