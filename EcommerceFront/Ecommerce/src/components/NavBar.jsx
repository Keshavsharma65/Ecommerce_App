import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const { getCartCount } = useCart();

    const cartCount = getCartCount();


    const handleSearch = (e) => {

        e.preventDefault();

        if (keyword.trim() === "") {
            navigate("/products");
            return;
        }

        navigate(
            `/products?keyword=${encodeURIComponent(keyword)}`
        );
    };


    return (

        <nav className="navbar">

            {/* LEFT SIDE */}

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

                <button onClick={() => navigate("/orders")}>
                    View Orders
                </button>

            </div>


            {/* CENTER */}

            <div className="navbar-title">

                <h2>
                    Ecommerce Store
                </h2>

            </div>


            {/* RIGHT SIDE */}

            <div className="navbar-right">

                <form
                    className="search-form"
                    onSubmit={handleSearch}
                >

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={keyword}
                        onChange={(e) =>
                            setKeyword(e.target.value)
                        }
                    />

                    <button type="submit">
                        🔍
                    </button>

                </form>


                {/* CART */}

                <button
                    className="cart-nav-button"
                    onClick={() => navigate("/cart")}
                    title="View Cart"
                >

                    <span className="cart-icon">
                        🛒
                    </span>

                    {cartCount > 0 && (
                        <span className="cart-badge">
                            {cartCount}
                        </span>
                    )}

                </button>

            </div>

        </nav>

    );
};

export default Navbar;