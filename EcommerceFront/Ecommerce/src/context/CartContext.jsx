import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();


export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {

        const savedCart = localStorage.getItem("cartItems");

        return savedCart
            ? JSON.parse(savedCart)
            : [];
    });


    // Save cart whenever it changes
    useEffect(() => {

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);


    // Add product to cart
    const addToCart = (product) => {

        setCartItems(prevItems => {

            const existingItem = prevItems.find(
                item => item.product_Id === product.product_Id
            );


            if (existingItem) {

                return prevItems.map(item =>
                    item.product_Id === product.product_Id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );

            }


            return [
                ...prevItems,
                {
                    ...product,
                    quantity: 1
                }
            ];

        });

    };


    // Increase quantity
    const increaseQuantity = (id) => {

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product_Id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );

    };


    // Decrease quantity
    const decreaseQuantity = (id) => {

        setCartItems(prevItems =>
            prevItems
                .map(item =>
                    item.product_Id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter(item => item.quantity > 0)
        );

    };


    // Remove product completely
    const removeFromCart = (id) => {

        setCartItems(prevItems =>
            prevItems.filter(
                item => item.product_Id !== id
            )
        );

    };


    // Empty entire cart
    const clearCart = () => {

        setCartItems([]);

    };


    // Total number of products
    const getCartCount = () => {

        return cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

    };


    // Total cart price
    const getCartTotal = () => {

        return cartItems.reduce(
            (total, item) =>
                total + (Number(item.product_Price) * item.quantity),
            0
        );

    };


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                getCartCount,
                getCartTotal
            }}
        >

            {children}

        </CartContext.Provider>
    );
};


// Custom hook
export const useCart = () => {

    return useContext(CartContext);

};