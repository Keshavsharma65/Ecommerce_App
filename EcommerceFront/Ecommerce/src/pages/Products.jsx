import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Productcard from "../components/Productcard";
import "../components/Productcard.css";
import './Products.css'

import api from "../axios";

const Products = () => {

    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("keyword");

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                let response;

                if (keyword && keyword.trim() !== "") {

                    response = await api.get(
                        `/product/search?keyword=${encodeURIComponent(keyword)}`
                    );

                } else {

                    response = await api.get("/products");

                }

                setProducts(response.data);

            } catch (error) {

                console.log("Error fetching products:", error);

            }

        };

        fetchProducts();

    }, [keyword]);


    return (
        <>

            {keyword && (
                <h2 className="search-result-heading">
                    Search results for "{keyword}"
                </h2>
            )}

            <div className="cardscontainer">

                {products.length > 0 ? (

                    products.map(product => (

                        <Productcard
                            key={product.product_Id}
                            product={product}
                        />

                    ))

                ) : (

                    <p>No products found.</p>

                )}

            </div>

        </>
    );
};

export default Products;