package com.keshav.controller;

import com.keshav.model.Product;
import com.keshav.repo.productRepo;
import com.keshav.service.productService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/badeer")
public class ProductController {

    @Autowired
    private productService service;
    @Autowired
    private productRepo productRepo;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Integer id) {
        Product product = service.getProductById(id);
        if (product != null) {
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/product/{id}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Integer id) {
        Product product = service.getProductById(id);
        if (product != null) {
            return new ResponseEntity<>(product.getProduct_Image(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/addproduct")
    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart MultipartFile product_image) {
        try {
            Product savedProduct = service.addorupdateProduct(product, product_image);
            return new ResponseEntity<>(savedProduct, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<?> updateProduct(@RequestPart Product product, @RequestPart MultipartFile product_image) {
        Product updatedProduct = new Product();
        try {
            updatedProduct = service.addorupdateProduct(product, product_image);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
        Product product = service.getProductById(id);
        if (product != null) {
            service.deleteProductById(id);
            return new ResponseEntity<>("deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product/search")
    public ResponseEntity<List<Product>> SearchProduct(@RequestParam String keyword) {
        List<Product> products = service.searchProduct(keyword);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

}
