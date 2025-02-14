"use client"

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    console.log("cart:", cart);
    

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);

            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (idProduct) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === idProduct);

            if (!existingProduct) return prevCart;

            if (existingProduct.quantity === 1) {
                return prevCart.filter(item => item.id !== idProduct);
            }

            return prevCart.map(item =>
                item.id === idProduct ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}