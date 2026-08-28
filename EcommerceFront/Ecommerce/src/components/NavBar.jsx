import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const handleSearch = (e) => {

        e.preventDefault();

        if (keyword.trim() === "") {
            navigate("/products");
            return;
        }

        navigate(`/products?keyword=${encodeURIComponent(keyword)}`);
    };

    return (
        <nav className="navbar">

            {/* LEFT */}
            <div className="navbar-left">

                <button onClick={() => navigate("/")}>
                    Home
                </button>

                <button onClick={() => navigate("/products")}>
                    All Products
                </button>

                <button onClick={() => navigate("/add-product")}>
                    Add Product
                </button>

            </div>

            {/* CENTER */}
            <div className="navbar-title">
                <h2>Ecommerce Store</h2>
            </div>

            {/* RIGHT */}
            <form
                className="search-form"
                onSubmit={handleSearch}
            >

                <input
                    type="text"
                    placeholder="Search products..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <button type="submit">
                    🔍
                </button>

            </form>

        </nav>
    );
};

export default Navbar;