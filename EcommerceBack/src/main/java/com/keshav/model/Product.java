package com.keshav.model;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.Date;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_Id;
    @Column(unique = true, nullable = false)
    private String productCode;
    private String product_Name;
    private String product_description;
    private Double product_Price;
    private String product_Category;
    private Date product_Date;
    private Boolean product_Status;
    private Integer product_Stock;
    private String product_Image_Name;
    private String product_Image_Type;
    @Lob
    private byte[] product_Image;

    public void setProduct_Image_Name(String product_Image_Name) {
        this.product_Image_Name = product_Image_Name;
    }

    public void setProduct_Image_Type(String product_Image_Type) {
        this.product_Image_Type = product_Image_Type;
    }

    public void setProduct_Image(byte[] product_Image) {
        this.product_Image = product_Image;
    }

    public String getProduct_Image_Name() {
        return product_Image_Name;
    }

    public String getProduct_Image_Type() {
        return product_Image_Type;
    }

    public byte[] getProduct_Image() {
        return product_Image;
    }

    public Integer getProduct_Id() {
        return product_Id;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductCode() {
        return productCode;
    }

    public String getProduct_Name() {
        return product_Name;
    }

    public String getProduct_description() {
        return product_description;
    }

    public Double getProduct_Price() {
        return product_Price;
    }

    public String getProduct_Category() {
        return product_Category;
    }

    public Date getProduct_Date() {
        return product_Date;
    }

    public Boolean getProduct_Status() {
        return product_Status;
    }

    public Integer getProduct_Stock() {
        return product_Stock;
    }

    public void setProduct_Id(Integer product_Id) {
        this.product_Id = product_Id;
    }

    public void setProduct_Name(String product_Name) {
        this.product_Name = product_Name;
    }

    public void setProduct_description(String product_description) {
        this.product_description = product_description;
    }

    public void setProduct_Price(Double product_Price) {
        this.product_Price = product_Price;
    }

    public void setProduct_Category(String product_Category) {
        this.product_Category = product_Category;
    }

    public void setProduct_Date(Date product_Date) {
        this.product_Date = product_Date;
    }

    public void setProduct_Status(Boolean product_Status) {
        this.product_Status = product_Status;
    }

    public void setProduct_Stock(Integer product_Stock) {
        this.product_Stock = product_Stock;
    }

    @Override
    public String toString() {
        return "Product{" +
                "product_Id=" + product_Id +
                ", productCode='" + productCode + '\'' +
                ", product_Name='" + product_Name + '\'' +
                ", product_description='" + product_description + '\'' +
                ", product_Price=" + product_Price +
                ", product_Category='" + product_Category + '\'' +
                ", product_Date=" + product_Date +
                ", product_Status=" + product_Status +
                ", product_Stock=" + product_Stock +
                ", product_Image_Name='" + product_Image_Name + '\'' +
                ", product_Image_Type='" + product_Image_Type + '\'' +
                ", product_Image=" + Arrays.toString(product_Image) +
                '}';
    }

    public Product(Integer product_Id, String productCode, String product_Name, String product_description, Double product_Price, String product_Category, Date product_Date, Boolean product_Status, Integer product_Stock, String product_Image_Name, String product_Image_Type, byte[] product_Image) {
        this.product_Id = product_Id;
        this.productCode = productCode;
        this.product_Name = product_Name;
        this.product_description = product_description;
        this.product_Price = product_Price;
        this.product_Category = product_Category;
        this.product_Date = product_Date;
        this.product_Status = product_Status;
        this.product_Stock = product_Stock;
        this.product_Image_Name = product_Image_Name;
        this.product_Image_Type = product_Image_Type;
        this.product_Image = product_Image;
    }

    public Product() {
    }
}
