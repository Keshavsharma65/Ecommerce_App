import React from 'react';
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const Productcard = ({ product }) => {

    const navigate = useNavigate();

    const imageUrl = `http://localhost:8080/badeer/product/${product.product_Id}/image`;

    return (
        <div className="card">

            <div className="product-image">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.product_Name}
                    />
                ) : (
                    <div className="no-image">
                        🖼️
                    </div>
                )}
            </div>

            <h1>{product.product_Name}</h1>

            <h2>₹{product.product_Price}</h2>

            <p>
                {product.product_Status
                    ? "Available"
                    : "Out of Stock"}
            </p>

            <button
                className="viewdetails"
                onClick={() =>
                    navigate(`/product/${product.product_Id}`)
                }
            >
                View Details
            </button>

        </div>
    );
};

export default Productcard;