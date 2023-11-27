import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1; 
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }]; 
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    }
  };
  
  const removeUnCart = (productId) => {
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingProductIndex].quantity > 1) {
        updatedCart[existingProductIndex].quantity -= 1; // Diminue la quantité du produit existant dans le panier
      } else {
        updatedCart.splice(existingProductIndex, 1); // Supprime complètement le produit si la quantité est de 1
      }
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    }
  };
  

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeUnCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};
