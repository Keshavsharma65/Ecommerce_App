import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../axios";
import "./Checkout.css";

const Checkout = () => {

    const navigate = useNavigate();

    const {
        cartItems,
        getCartTotal,
        clearCart
    } = useCart();

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const total = getCartTotal();


    // Prevent checkout with an empty cart
    if (cartItems.length === 0) {

        return (
            <div className="checkout-empty">

                <div className="checkout-empty-icon">
                    🛒
                </div>

                <h1>Your Cart is Empty</h1>

                <p>
                    Add some products before proceeding to checkout.
                </p>

                <button
                    onClick={() => navigate("/products")}
                >
                    Continue Shopping
                </button>

            </div>
        );
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            const orderRequest = {

                customerName: customerName.trim(),

                customerEmail: customerEmail.trim(),

                items: cartItems.map(item => ({

                    productId: item.product_Id,

                    productQuantity: item.quantity

                }))

            };


            console.log("Order Request:", orderRequest);


            const response = await api.post(
                "/order",
                orderRequest
            );


            console.log(
                "Order placed successfully:",
                response.data
            );


            // Empty cart after successful order
            clearCart();


            alert("Order placed successfully!");


            // Go to orders page
            navigate("/orders");


        } catch (error) {

            console.log("Order failed:", error);

            setError(
                error.response?.data?.message ||
                "Failed to place order. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="checkout-page">

            <div className="checkout-header">

                <span className="checkout-label">
                    CHECKOUT
                </span>

                <h1>
                    Complete Your Order
                </h1>

                <p>
                    Enter your details to place the order.
                </p>

            </div>


            <div className="checkout-content">


                {/* CUSTOMER DETAILS */}

                <div className="checkout-form-container">

                    <h2>
                        Customer Details
                    </h2>

                    <form
                        className="checkout-form"
                        onSubmit={handleSubmit}
                    >

                        <label>
                            Full Name

                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) =>
                                    setCustomerName(e.target.value)
                                }
                                placeholder="Enter your name"
                                required
                            />

                        </label>


                        <label>
                            Email Address

                            <input
                                type="email"
                                value={customerEmail}
                                onChange={(e) =>
                                    setCustomerEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                                required
                            />

                        </label>


                        {error && (

                            <div className="checkout-error">
                                {error}
                            </div>

                        )}


                        <button
                            type="submit"
                            className="confirm-order-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Placing Order..."
                                : "Confirm Order"}

                        </button>


                        <button
                            type="button"
                            className="back-to-cart-button"
                            onClick={() => navigate("/cart")}
                            disabled={loading}
                        >
                            Back to Cart
                        </button>

                    </form>

                </div>


                {/* ORDER SUMMARY */}

                <div className="checkout-summary">

                    <h2>
                        Order Summary
                    </h2>


                    <div className="checkout-items">

                        {cartItems.map(item => (

                            <div
                                className="checkout-item"
                                key={item.product_Id}
                            >

                                <div>

                                    <strong>
                                        {item.product_Name}
                                    </strong>

                                    <span>
                                        × {item.quantity}
                                    </span>

                                </div>

                                <strong>
                                    ₹{(
                                        Number(item.product_Price) *
                                        item.quantity
                                    ).toLocaleString("en-IN")}
                                </strong>

                            </div>

                        ))}

                    </div>


                    <div className="checkout-divider"></div>


                    <div className="checkout-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹{total.toLocaleString("en-IN")}
                        </strong>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Checkout;