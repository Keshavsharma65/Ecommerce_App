package com.keshav.service;

import com.keshav.model.Product;
import com.keshav.model.dto.orderItemRequest;
import com.keshav.model.dto.orderItemResponse;
import com.keshav.model.dto.orderRequest;
import com.keshav.model.dto.orderResponse;
import com.keshav.model.order;
import com.keshav.model.orderItem;
import com.keshav.repo.orderRepo;
import com.keshav.repo.productRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class orderService {
    @Autowired
    private productRepo productRepo;
    @Autowired
    private orderRepo orderRepo;

    @PostMapping("/order")
    public orderResponse placeOrder(@RequestBody orderRequest request) {

        order order = new order();
        String orderId = "ORD" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        order.setOrderId(orderId);
        order.setCustomerName(request.customerName());
        order.setCustomerEmail(request.customerEmail());
        order.setStatus("Placed");
        order.setOrderDate(LocalDate.now());

        List<orderItem> orderItems = new ArrayList<>();
        for (orderItemRequest itemRequest : request.items()) {
            Product product = productRepo.findById(itemRequest.productId()).orElseThrow(() -> new RuntimeException("Product NOT FOUND"));
            product.setProduct_Stock(product.getProduct_Stock() - itemRequest.productQuantity());
            productRepo.save(product);
            orderItem orderitem = new orderItem();
            orderitem.setProduct(product);
            orderitem.setQuantity(itemRequest.productQuantity());
            orderitem.setPrice(product.getProduct_Price() * itemRequest.productQuantity());
            orderitem.setOrder(order);
            orderItems.add(orderitem);

        }
        order.setOrderItems(orderItems);
        order savedOrder = orderRepo.save(order);

        List<orderItemResponse> orderResponses = new ArrayList<>();
        for (orderItem item : order.getOrderItems()) {
            orderItemResponse orderItemResponse = new orderItemResponse(item.getProduct().getProduct_Name(), item.getQuantity(), item.getPrice());
            orderResponses.add(orderItemResponse);
        }

        orderResponse orderresponse = new orderResponse(savedOrder.getOrderId(), savedOrder.getCustomerName(), savedOrder.getCustomerEmail(), savedOrder.getStatus(), savedOrder.getOrderDate(), orderResponses);
        return orderresponse;
    }

    @GetMapping("/allorders")
    public List<orderResponse> getAllOrders() {
        List<order> orders = orderRepo.findAll();

        List<orderResponse> orderresponses = new ArrayList<>();
        for (order order : orders) {
            ArrayList<orderItemResponse> itemResponses = new ArrayList<orderItemResponse>();
            for (orderItem item : order.getOrderItems()) {
                orderItemResponse orderitemresponse = new orderItemResponse(item.getProduct().getProduct_Name(), item.getQuantity(), item.getPrice());
                itemResponses.add(orderitemresponse);
            }

            orderResponse orderresponse = new orderResponse(
                    order.getOrderId(), order.getCustomerName(), order.getCustomerEmail(), order.getStatus(), order.getOrderDate(), itemResponses);
            orderresponses.add(orderresponse);
        }
        return orderresponses;
    }
}
