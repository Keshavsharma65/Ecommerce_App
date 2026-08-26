import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import "./ProductDetails.css";

const ProductDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        api.get(`/product/${id}`)
            .then(response => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("Error fetching product:", error);
            });

    }, [id]);

    const handleDelete = () => {

        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        api.delete(`/product/${id}`)
            .then(() => {
                alert("Product deleted successfully");
                navigate("/products");
            })
            .catch(error => {
                console.log("Delete failed:", error);
                alert("Delete failed");
            });
    };

    if (!product) {
        return <h2>Loading...</h2>;
    }

    const imageUrl = `http://localhost:8080/badeer/product/${product.product_Id}/image`;

    return (
        <div className="product-details">

            <div className="product-details-image">
                <img
                    src={imageUrl}
                    alt={product.product_Name}
                />
            </div>

            <div className="product-details-info">

                <h1>{product.product_Name}</h1>

                <h2>₹{product.product_Price}</h2>

                <p>
                    <strong>Product Code:</strong>{" "}
                    {product.productCode}
                </p>

                <p>
                    <strong>Description:</strong>{" "}
                    {product.product_description}
                </p>

                <p>
                    <strong>Category:</strong>{" "}
                    {product.product_Category}
                </p>

                <p>
                    <strong>Stock:</strong>{" "}
                    {product.product_Stock}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {product.product_Status
                        ? "Available"
                        : "Out of Stock"}
                </p>

                <p>
                    <strong>Date:</strong>{" "}
                    {product.product_Date}
                </p>

                <div className="product-actions">

                    <button
                        onClick={() =>
                            navigate(`/update-product/${product.product_Id}`)
                        }
                    >
                        Update Product
                    </button>

                    <button
                        onClick={handleDelete}
                    >
                        Delete Product
                    </button>

                    <button
                        onClick={() => navigate("/products")}
                    >
                        Back to Products
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;