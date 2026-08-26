import React, { useState } from "react";
import api from "../axios";
import "./AddProduct.css";

const AddProduct = () => {

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
                [JSON.stringify(product)],
                {
                    type: "application/json"
                }
            );

            formData.append("product", productBlob);

            formData.append("product_image", productImage);

            const response = await api.post(
                "/addproduct",
                formData
            );

            console.log("Product added:", response.data);

            alert("Product added successfully!");

            setProduct({
                productCode: "",
                product_Name: "",
                product_description: "",
                product_Price: "",
                product_Category: "",
                product_Date: "",
                product_Status: true,
                product_Stock: ""
            });

            setProductImage(null);

        } catch (error) {

            console.log("Error adding product:", error);

            alert("Failed to add product");

        }
    };

    return (
        <div className="add-product-container">

            <h1>Add Product</h1>

            <form
                className="add-product-form"
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
                    Product Image

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </label>

                <button type="submit">
                    Add Product
                </button>

            </form>

        </div>
    );
};

export default AddProduct;