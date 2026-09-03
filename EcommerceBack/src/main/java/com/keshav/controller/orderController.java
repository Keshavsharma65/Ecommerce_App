package com.keshav.controller;

import com.keshav.model.dto.orderRequest;
import com.keshav.model.dto.orderResponse;
import com.keshav.service.orderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/badeer")
public class orderController {

    @Autowired
    orderService orderservice;

    @PostMapping("/order")
    public ResponseEntity<orderResponse> placeOrder(
            @RequestBody orderRequest orderrequest) {

        orderResponse orderresponse =
                orderservice.placeOrder(orderrequest);

        return new ResponseEntity<>(
                orderresponse,
                HttpStatus.CREATED
        );
    }

    @GetMapping("/getorders")
    public ResponseEntity<List<orderResponse>> getAllOrders() {

        List<orderResponse> response =
                orderservice.getAllOrders();

        return new ResponseEntity<>(
                response,
                HttpStatus.OK
        );
    }
}