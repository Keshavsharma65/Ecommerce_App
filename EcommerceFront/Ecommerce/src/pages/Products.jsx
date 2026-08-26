import React, { useEffect, useState } from "react";
import Productcard from "../components/Productcard";
import "../components/ProductCard.css";
import api from "../axios";
import '../pages/Products.css'

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        api.get("/products")
            .then(response => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("Error fetching products:", error);
            });

    }, []);

    return (
        <div className="cardscontainer">

            {products.map(product => (
                <Productcard
                    key={product.product_Id}
                    product={product}
                />
            ))}

        </div>
    );
};

export default Products;