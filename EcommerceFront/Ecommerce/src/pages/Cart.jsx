import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {

    const navigate = useNavigate();

    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getCartTotal
    } = useCart();


    const total = getCartTotal();


    if (cartItems.length === 0) {

        return (
            <div className="cart-page empty-cart">

                <div className="empty-cart-icon">
                    🛒
                </div>

                <h1>Your Cart is Empty</h1>

                <p>
                    Looks like you haven't added anything to your cart yet.
                </p>

                <button
                    className="continue-shopping"
                    onClick={() => navigate("/products")}
                >
                    Continue Shopping
                </button>

            </div>
        );

    }


    return (

        <div className="cart-page">

            {/* HEADER */}

            <div className="cart-header">

                <div>
                    <span className="cart-label">
                        SHOPPING CART
                    </span>

                    <h1>
                        Your Cart
                    </h1>

                    <p>
                        Review your items before placing your order.
                    </p>
                </div>

                <span className="cart-item-count">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "Item" : "Items"}
                </span>

            </div>


            {/* CART CONTENT */}

            <div className="cart-content">


                {/* ITEMS */}

                <div className="cart-items">

                    {cartItems.map(item => {

                        const imageUrl =
                            `http://localhost:8080/badeer/product/${item.product_Id}/image`;

                        const itemTotal =
                            Number(item.product_Price) * item.quantity;


                        return (

                            <div
                                className="cart-item"
                                key={item.product_Id}
                            >

                                {/* IMAGE */}

                                <div className="cart-item-image">

                                    <img
                                        src={imageUrl}
                                        alt={item.product_Name}
                                    />

                                </div>


                                {/* INFO */}

                                <div className="cart-item-info">

                                    <h2>
                                        {item.product_Name}
                                    </h2>

                                    <p className="cart-item-code">
                                        Product Code: {item.productCode}
                                    </p>

                                    <p className="cart-item-price">
                                        ₹{Number(item.product_Price).toLocaleString("en-IN")}
                                    </p>

                                </div>


                                {/* QUANTITY */}

                                <div className="quantity-section">

                                    <span>
                                        Quantity
                                    </span>

                                    <div className="quantity-controls">

                                        <button
                                            onClick={() =>
                                                decreaseQuantity(item.product_Id)
                                            }
                                        >
                                            −
                                        </button>

                                        <strong>
                                            {item.quantity}
                                        </strong>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(item.product_Id)
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                </div>


                                {/* ITEM TOTAL */}

                                <div className="cart-item-total">

                                    <span>
                                        Total
                                    </span>

                                    <strong>
                                        ₹{itemTotal.toLocaleString("en-IN")}
                                    </strong>

                                </div>


                                {/* REMOVE */}

                                <button
                                    className="remove-item"
                                    onClick={() =>
                                        removeFromCart(item.product_Id)
                                    }
                                    title="Remove item"
                                >
                                    ×
                                </button>

                            </div>

                        );

                    })}

                </div>


                {/* SUMMARY */}

                <div className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>


                    <div className="summary-row">

                        <span>
                            Items
                        </span>

                        <span>
                            {cartItems.reduce(
                                (total, item) =>
                                    total + item.quantity,
                                0
                            )}
                        </span>

                    </div>


                    <div className="summary-row">

                        <span>
                            Subtotal
                        </span>

                        <span>
                            ₹{total.toLocaleString("en-IN")}
                        </span>

                    </div>


                    <div className="summary-row">

                        <span>
                            Delivery
                        </span>

                        <span className="free-delivery">
                            FREE
                        </span>

                    </div>


                    <div className="summary-divider"></div>


                    <div className="summary-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹{total.toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <button
                        className="place-order-button"
                        onClick={() => navigate("/checkout")}
                    >
                        Place Order
                    </button>


                    <button
                        className="continue-shopping"
                        onClick={() => navigate("/products")}
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

        </div>

    );

};


export default Cart;