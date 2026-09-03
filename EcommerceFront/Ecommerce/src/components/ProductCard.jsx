import React from "react";
import "./Productcard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


const Productcard = ({ product }) => {

    const navigate = useNavigate();

    const { addToCart } = useCart();

    const imageUrl =
        `http://localhost:8080/badeer/product/${product.product_Id}/image`;


    const handleAddToCart = () => {

        addToCart(product);

        alert(`${product.product_Name} added to cart!`);

    };


    const isOutOfStock =
        product.product_Status === false ||
        product.product_Stock <= 0;


    return (

        <div className="card">

            {/* PRODUCT IMAGE */}
            <div className="product-image">

                <img
                    src={imageUrl}
                    alt={product.product_Name}
                />

            </div>


            {/* PRODUCT NAME */}
            <h1>
                {product.product_Name}
            </h1>


            {/* PRICE */}
            <h2>
                ₹{Number(product.product_Price).toLocaleString("en-IN")}
            </h2>


            {/* STATUS */}
            <p className={
                isOutOfStock
                    ? "out-of-stock"
                    : "available"
            }>
                {isOutOfStock
                    ? "Out of Stock"
                    : "Available"}
            </p>


            {/* ACTIONS */}
            <div className="card-actions">

                <button
                    className="viewdetails"
                    onClick={() =>
                        navigate(`/product/${product.product_Id}`)
                    }
                >
                    View Details
                </button>


                <button
                    className="add-to-cart"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock
                        ? "Out of Stock"
                        : "Add to Cart"}
                </button>

            </div>

        </div>

    );
};


export default Productcard;