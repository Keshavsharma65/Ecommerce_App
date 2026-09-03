package com.keshav.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class orderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;
    @ManyToOne(fetch = FetchType.LAZY)
    private order order;
    private int quantity;
    private int price;
    @ManyToOne
    private Product product;

    public int getItemId() {
        return itemId;
    }

    public order getOrder() {
        return order;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getPrice() {
        return price;
    }

    public Product getProduct() {
        return product;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public void setOrder(order order) {
        this.order = order;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public orderItem(int itemId, order order, int quantity, int price, Product product) {
        this.itemId = itemId;
        this.order = order;
        this.quantity = quantity;
        this.price = price;
        this.product = product;
    }

    public orderItem() {
    }

    @Override
    public String toString() {
        return "orderItem{" +
                "itemId=" + itemId +
                ", order=" + order +
                ", quantity=" + quantity +
                ", price=" + price +
                ", product=" + product +
                '}';
    }
}
