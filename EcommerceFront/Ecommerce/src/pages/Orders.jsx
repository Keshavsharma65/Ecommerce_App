import React, { useEffect, useState } from "react";
import api from "../axios";
import "./Orders.css";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response = await api.get("/getorders");

                console.log("Orders received:", response.data);

                // Inspect the exact order-item structure
                response.data.forEach((order, index) => {
                    console.log(`Order ${index + 1}:`, order);
                    console.log(`Order ${index + 1} items:`, order.items);
                });

                setOrders(response.data);

            } catch (error) {

                console.log("Error fetching orders:", error);

                setError("Failed to load orders.");

            } finally {

                setLoading(false);

            }
        };

        fetchOrders();

    }, []);


    /* =========================
       LOADING
       ========================= */

    if (loading) {

        return (
            <div className="orders-page orders-state">

                <div className="orders-loader"></div>

                <p>
                    Loading orders...
                </p>

            </div>
        );
    }


    /* =========================
       ERROR
       ========================= */

    if (error) {

        return (
            <div className="orders-page orders-state">

                <div className="orders-error-icon">
                    ⚠️
                </div>

                <h2>
                    Something went wrong
                </h2>

                <p>
                    {error}
                </p>

            </div>
        );
    }


    /* =========================
       MAIN UI
       ========================= */

    return (
        <div className="orders-page">

            {/* ================= HEADER ================= */}

            <div className="orders-header">

                <div>

                    <span className="orders-label">
                        ORDER HISTORY
                    </span>

                    <h1>
                        Your Orders
                    </h1>

                    <p>
                        View all orders placed through the store.
                    </p>

                </div>


                <div className="orders-count">

                    <strong>
                        {orders.length}
                    </strong>

                    <span>
                        {orders.length === 1
                            ? "Order"
                            : "Orders"}
                    </span>

                </div>

            </div>


            {/* ================= NO ORDERS ================= */}

            {orders.length === 0 ? (

                <div className="no-orders">

                    <div className="no-orders-icon">
                        📦
                    </div>

                    <h2>
                        No Orders Yet
                    </h2>

                    <p>
                        Your placed orders will appear here.
                    </p>

                </div>

            ) : (

                <div className="orders-list">

                    {orders.map((order, index) => (

                        <div
                            className="order-card"
                            key={order.orderId || index}
                        >

                            {/* ================= ORDER HEADER ================= */}

                            <div className="order-card-top">

                                <div>

                                    <span className="order-number">
                                        ORDER #{order.orderId || index + 1}
                                    </span>

                                    <h2>
                                        Order Details
                                    </h2>

                                </div>


                                <span className="order-status">
                                    ✓ {order.status || "Placed"}
                                </span>

                            </div>


                            <div className="order-divider"></div>


                            {/* ================= ORDER DETAILS ================= */}

                            <div className="order-details">

                                {Object.entries(order)
                                    .filter(([key]) => key !== "items")
                                    .map(([key, value]) => (

                                        <div
                                            className="order-detail"
                                            key={key}
                                        >

                                            <span className="order-detail-label">
                                                {formatLabel(key)}
                                            </span>

                                            <strong>
                                                {formatValue(key, value)}
                                            </strong>

                                        </div>

                                    ))}

                            </div>


                            {/* ================= PRODUCTS ORDERED ================= */}

                            {Array.isArray(order.items) &&
                                order.items.length > 0 && (

                                    <div className="ordered-items">

                                        <h3>
                                            Products Ordered
                                        </h3>


                                        <div className="ordered-items-list">

                                            {order.items.map(
                                                (item, itemIndex) => {

                                                    /*
                                                     * Product name
                                                     */

                                                    const productName =
                                                        item.productName ??
                                                        item.product_Name ??
                                                        item.name ??
                                                        "Unknown Product";


                                                    /*
                                                     * Quantity
                                                     *
                                                     * Prefer productQuantity
                                                     * if the backend provides it.
                                                     */

                                                    const quantity =
                                                        item.productQuantity ??
                                                        item.product_Quantity ??
                                                        item.quantity ??
                                                        0;


                                                    /*
                                                     * Price
                                                     */

                                                    const price =
                                                        item.productPrice ??
                                                        item.product_Price ??
                                                        item.price ??
                                                        item.totalPrice ??
                                                        item.amount ??
                                                        0;


                                                    console.log(
                                                        "ORDER ITEM:",
                                                        {
                                                            productName,
                                                            quantity,
                                                            price,
                                                            rawItem: item
                                                        }
                                                    );


                                                    return (

                                                        <div
                                                            className="ordered-item"
                                                            key={itemIndex}
                                                        >

                                                            {/* PRODUCT INFORMATION */}

                                                            <div className="ordered-item-info">

                                                                <span className="ordered-item-number">
                                                                    {itemIndex + 1}
                                                                </span>


                                                                <div>

                                                                    <strong>
                                                                        {productName}
                                                                    </strong>

                                                                    <span>
                                                                        Quantity: {quantity}
                                                                    </span>

                                                                </div>

                                                            </div>


                                                            {/* PRODUCT PRICE */}

                                                            <strong className="ordered-item-price">

                                                                ₹{Number(price).toLocaleString("en-IN")}

                                                            </strong>

                                                        </div>

                                                    );

                                                }
                                            )}

                                        </div>

                                    </div>

                                )}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};


/* =========================================================
   FORMAT LABEL
   ========================================================= */

const formatLabel = (key) => {

    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (char) => char.toUpperCase())
        .replace(/_/g, " ");
};


/* =========================================================
   FORMAT VALUE
   ========================================================= */

const formatValue = (key, value) => {

    if (value === null || value === undefined) {
        return "-";
    }


    /*
     * Don't render arrays/objects directly.
     */

    if (typeof value === "object") {
        return "-";
    }


    /*
     * Price / amount / total
     */

    if (
        key.toLowerCase().includes("price") ||
        key.toLowerCase().includes("amount") ||
        key.toLowerCase().includes("total")
    ) {

        if (!isNaN(value)) {

            return `₹${Number(value).toLocaleString("en-IN")}`;

        }

    }


    /*
     * Boolean
     */

    if (typeof value === "boolean") {

        return value ? "Yes" : "No";

    }


    return String(value);
};


export default Orders;