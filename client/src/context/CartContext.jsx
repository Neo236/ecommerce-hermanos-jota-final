
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el Context
const CartContext = createContext();

// Función de ayuda para obtener el carrito de localStorage
const getInitialCart = () => {
    try {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Error al parsear cartItems de localStorage", error);
        return [];
    }
};

// 2. Creamos el Proveedor
export const CartProvider = ({ children }) => {
    // 3. Definimos el estado, inicializándolo desde localStorage
    const [cartItems, setCartItems] = useState(getInitialCart());

    // 4. Creamos un useEffect para guardar en localStorage CADA VEZ que el carrito cambie
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // 5. Definimos las funciones del carrito

    const addToCart = (productToAdd) => {
        setCartItems(prevItems => {
            // Buscamos si el producto ya existe en el carrito
            const existingItem = prevItems.find(item => item.id === productToAdd.id);

            if (existingItem) {
                // Si existe, actualizamos su cantidad (qty)
                return prevItems.map(item =>
                    item.id === productToAdd.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            } else {
                // Si no existe, lo añadimos al arreglo con cantidad 1
                return [...prevItems, { ...productToAdd, qty: 1 }];
            }
        });
        alert(`${productToAdd.name} fue añadido al carrito.`);
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => {
            return prevItems.filter(item => item.id !== productId);
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // 6. Exponemos el estado y las funciones
    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

// 7. Creamos el hook personalizado
export const useCart = () => {
    return useContext(CartContext);
};