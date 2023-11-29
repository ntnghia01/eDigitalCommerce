package com.backend.springboot.ecommerce.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
// import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.springboot.ecommerce.entity.Brand;
import com.backend.springboot.ecommerce.entity.Category;
import com.backend.springboot.ecommerce.entity.Product;
import com.backend.springboot.ecommerce.payload.request.ProductRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.BrandRepository;
import com.backend.springboot.ecommerce.repository.CategoryRepository;
import com.backend.springboot.ecommerce.repository.ProductRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BrandRepository brandRepository;

    @Value("${file.upload.directory}")
    private String uploadDirectory;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProduct() {
        List<Product> productList = productRepository.findAllProduct();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Product>> getAllProductAvailable() {
        List<Product> productList = productRepository.findAllProductAvailable();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/category/{cateId}")
    public ResponseEntity<List<Product>> getProductByCategoryID(@PathVariable Integer cateId) {
        List<Product> products = productRepository.findProductByCateID(cateId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<Product>> getProductByBrandID(@PathVariable Integer brandId) {
        List<Product> products = productRepository.findProductByBrandID(brandId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@ModelAttribute ProductRequestDto productRequestDto) {
        Optional<Category> categOptional = categoryRepository.findById(productRequestDto.getCateId());
        Optional<Brand> brandOptional = brandRepository.findById(productRequestDto.getBrandId());
        if (categOptional.isPresent() && brandOptional.isPresent()) {

            Category category = categOptional.get();
            Brand brand = brandOptional.get();

            try {
                // Luu tep hinh anh vao thu muc uploads
                if (productRequestDto.getImage() != null) {
                    MultipartFile imageFile = productRequestDto.getImage();

                    // String fileName = imageFile.getOriginalFilename();
                    String originalFileName = imageFile.getOriginalFilename();
                    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                    String fileName = "product_" + System.currentTimeMillis() + fileExtension;

                    Path uploadPath = Paths.get(uploadDirectory, fileName);
                    imageFile.transferTo(uploadPath.toFile());

                    // Luu ten tep vao productRequestDto
                    productRequestDto.setProImage(fileName);
                }
            } catch (IOException e) {
                return new ResponseEntity<>(new MessageResponse("Failed to upload image"), HttpStatus.NOT_FOUND);
            }


            Product newProduct = new Product();

            newProduct.setCategory(category);
            newProduct.setBrand(brand);
            newProduct.setProName(productRequestDto.getProName());
            newProduct.setProPrice(productRequestDto.getProPrice());
            newProduct.setProDesc(productRequestDto.getProDesc());
            newProduct.setProQuantity(productRequestDto.getProQuantity());
            newProduct.setProStatus(1);
            newProduct.setProCreatedAt(LocalDateTime.now());
            newProduct.setProUpdatedAt(LocalDateTime.now());
            newProduct.setProImage(productRequestDto.getProImage());

            productRepository.save(newProduct);
            return ResponseEntity.ok(new MessageResponse("Add product successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Add product failed"), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{proId}")
    public ResponseEntity<?> updateProduct(@PathVariable Integer proId, @ModelAttribute ProductRequestDto productRequestDto) {
        Optional<Product> proOptional = productRepository.findById(proId);
        Optional<Category> cateOptional = categoryRepository.findById(productRequestDto.getCateId());
        Optional<Brand> brandOptional = brandRepository.findById(productRequestDto.getBrandId());

        if (proOptional.isPresent() && cateOptional.isPresent() && brandOptional.isPresent()) {
            Product product = proOptional.get();
            Category category = cateOptional.get();
            Brand brand = brandOptional.get();

            try {
                // Luu tep hinh anh vao thu muc uploads
                if (productRequestDto.getImage() != null) {
                    MultipartFile imageFile = productRequestDto.getImage();

                    // String fileName = imageFile.getOriginalFilename();
                    String originalFileName = imageFile.getOriginalFilename();
                    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                    String fileName = "product_" + System.currentTimeMillis() + fileExtension;

                    Path uploadPath = Paths.get(uploadDirectory, fileName);
                    imageFile.transferTo(uploadPath.toFile());

                    // Luu ten tep vao productRequestDto
                    productRequestDto.setProImage(fileName);

                    // Delete Old Image
                    String oldImageFileName = product.getProImage();
                    if (oldImageFileName != null) {
                        Path oldImagePath = Paths.get(uploadDirectory, oldImageFileName);
                        Files.delete(oldImagePath);
                    }
                }
            } catch (IOException e) {
                
            }

            product.setCategory(category);
            product.setBrand(brand);
            product.setProName(productRequestDto.getProName());
            product.setProImage(productRequestDto.getProImage());
            product.setProPrice(productRequestDto.getProPrice());
            product.setProDesc(productRequestDto.getProDesc());
            product.setProQuantity(productRequestDto.getProQuantity());
            product.setProStatus(productRequestDto.getProStatus());
            product.setProUpdatedAt(LocalDateTime.now());

            productRepository.save(product);
            return ResponseEntity.ok(new MessageResponse("Update product successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{proId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer proId) {
        Optional<Product> proOptional = productRepository.findById(proId);
        if (proOptional.isPresent()) {
            Product product = proOptional.get();
            product.setProStatus(-1);
            productRepository.save(product);
            return ResponseEntity.ok(new MessageResponse("Delete product successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{proId}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer proId) {
        Optional<Product> proOptional = productRepository.findById(proId);
        if (proOptional.isPresent()) {
            Product product = proOptional.get();
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/images/{imageName}")
    @ResponseBody
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        Path imagePath = Paths.get(uploadDirectory, imageName);
        Resource imageResource;
        try {
            imageResource = new UrlResource(imagePath.toUri());
            if (imageResource.exists() && imageResource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE)
                        .body(imageResource);
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/search")
    public ResponseEntity<List<Product>> searchProductByName(@RequestBody ProductRequestDto searchData) {
        // List<Product> productList = productRepository.findProductByName(searchData);
        // return new ResponseEntity<>(productList, HttpStatus.OK);
        List<Product> productList;
        if (searchData.getProName() == "") {
            productList = productRepository.findAllProductAvailable(); // Lấy tất cả sản phẩm nếu searchData rỗng
        } else {
            productList = productRepository.findProductByName(searchData.getProName());
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

}
