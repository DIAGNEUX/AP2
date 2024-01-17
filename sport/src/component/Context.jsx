import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (userIsLoggedIn === '1') {
      setIsLoggedIn(true);
    }

    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(parseInt(storedUserRole));
    }
  }, []);

  const updateUserRole = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };
  const addToCart = async (product) => {
    try {
      const userId = Cookies.get('iduser');
      if (!product.id) {
        console.error('L\'ID du produit est manquant ou nul.');
        return;
      }
  
      const response = await axios.post('http://localhost:3001/addToCart', {
        utilisateur_id: userId,
        produit_id: product.id,
      });
  
      if (response.status === 200) {
        const cartResponse = await axios.get(`http://localhost:3001/getCart?utilisateur_id=${userId}`);
  
        if (cartResponse.status === 200) {
          const updatedCart = cartResponse.data;
          // Modifier ici pour inclure le nom, l'image et le prix dans chaque élément du panier
          const detailedCart = await axios.post('http://localhost:3001/getProducts', { cart: updatedCart });
  
          setCart(detailedCart.data);
          saveCartToLocalStorage(detailedCart.data);
        }
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  
  const removeUnCart = (productId) => {
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingProductIndex].quantity > 1) {
        updatedCart[existingProductIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingProductIndex, 1);
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


  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', '1');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };
  

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoggedIn,
        userRole,
        addToCart,
        removeUnCart,
        removeFromCart,
        clearCart,
        login,
        logout,
        updateUserRole,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
