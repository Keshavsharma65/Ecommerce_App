import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import "./UpdateProduct.css";

const UpdateProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productCode: "",
        product_Name: "",
        product_description: "",
        product_Price: "",
        product_Category: "",
        product_Date: "",
        product_Status: true,
        product_Stock: ""
    });

    const [productImage, setProductImage] = useState(null);

    useEffect(() => {

        api.get(`/product/${id}`)
            .then(response => {

                const data = response.data;

                setProduct({
                    productCode: data.productCode || "",
                    product_Name: data.product_Name || "",
                    product_description: data.product_description || "",
                    product_Price: data.product_Price || "",
                    product_Category: data.product_Category || "",
                    product_Date: data.product_Date
                        ? data.product_Date.substring(0, 10)
                        : "",
                    product_Status: data.product_Status,
                    product_Stock: data.product_Stock || ""
                });

            })
            .catch(error => {
                console.log("Error fetching product:", error);
            });

    }, [id]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            const productBlob = new Blob(
                [JSON.stringify({
                    ...product,
                    product_Price: Number(product.product_Price),
                    product_Stock: Number(product.product_Stock),
                    product_Status: product.product_Status === true ||
                        product.product_Status === "true"
                })],
                {
                    type: "application/json"
                }
            );

            formData.append("product", productBlob);

            if (productImage) {
                formData.append("product_image", productImage);
            }

            const response = await api.put(
                `/product/${id}`,
                formData
            );

            console.log("Product updated:", response.data);

            alert("Product updated successfully!");

            navigate(`/product/${id}`);

        } catch (error) {

            console.log("Update failed:", error);

            alert("Failed to update product");

        }
    };

    return (
        <div className="update-product-container">

            <h1>Update Product</h1>

            <form
                className="update-product-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="productCode"
                    value={product.productCode}
                    onChange={handleChange}
                    placeholder="Product Code"
                    required
                />

                <input
                    type="text"
                    name="product_Name"
                    value={product.product_Name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                />

                <textarea
                    name="product_description"
                    value={product.product_description}
                    onChange={handleChange}
                    placeholder="Product Description"
                    required
                />

                <input
                    type="number"
                    name="product_Price"
                    value={product.product_Price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />

                <input
                    type="text"
                    name="product_Category"
                    value={product.product_Category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                />

                <input
                    type="date"
                    name="product_Date"
                    value={product.product_Date}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="product_Stock"
                    value={product.product_Stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    required
                />

                <label className="status-label">
                    Status

                    <select
                        name="product_Status"
                        value={product.product_Status}
                        onChange={handleChange}
                    >
                        <option value={true}>Available</option>
                        <option value={false}>Out of Stock</option>
                    </select>
                </label>

                <label className="image-label">
                    Change Product Image

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>

                <button type="submit">
                    Update Product
                </button>

            </form>

        </div>
    );
};

export default UpdateProduct;