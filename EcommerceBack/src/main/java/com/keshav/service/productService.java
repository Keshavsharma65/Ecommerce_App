package com.keshav.service;

import com.keshav.model.Product;
import com.keshav.repo.productRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class productService {

    @Autowired
    private productRepo repo;

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Product addorupdateProduct(Product product, MultipartFile product_image) throws IOException {
        product.setProduct_Image_Name(product_image.getOriginalFilename());
        product.setProduct_Image_Type(product_image.getContentType());
        product.setProduct_Image(product_image.getBytes());
        return repo.save(product);
    }

    public void deleteProductById(int id) {
        repo.deleteById(id);
    }

    public List<Product> searchProduct(String keyword) {
        return repo.searchProduct(keyword);
    }


}
