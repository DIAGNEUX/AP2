import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCartDetails = async () => {
    try {
      const userId = Cookies.get('iduser');
      if (!userId) {
        console.error('L\'ID de l\'utilisateur est manquant ou nul.');
        return;
      }

      const cartResponse = await axios.get(`http://192.168.1.33:3001/getCart?utilisateur_id=${userId}`);
      console.log('Cart Response:', cartResponse.data); 
  
      if (cartResponse.status === 200) {
        const updatedCart = cartResponse.data;
      
        const productsResponse = await axios.post('http://192.168.1.33:3001/getProducts', { cart: updatedCart });
  
        if (productsResponse.status === 200) {
          const cartWithDetails = productsResponse.data;
          setCart(cartWithDetails);
        }
      }
    } catch (error) {
      console.error('Error fetching cart details:', error);
    }
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
  useEffect(() => {
    const fetchData = async () => {
      await fetchCartDetails();
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const addToCart = async (product) => {
    try {
      const userId = Cookies.get('iduser');
      if (!product.id) {
        console.error('L\'ID du produit est manquant ou nul.');
        return;
      }
  
      const response = await axios.post('http://192.168.1.33:3001/api/cart', {
        utilisateur_id: userId,
        produit_id: product.id,
      });
  
      if (response.status === 200) {
        const cartResponse = await axios.get(`http://192.168.1.33:3001/api/cart?utilisateur_id=${userId}`);
  
        if (cartResponse.status === 200) {
          const updatedCart = cartResponse.data;
          const detailedCart = await axios.post('http://192.168.1.33:3001/getProducts', { cart: updatedCart });
          setCart(detailedCart.data);
        }
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
 
  const removeFromCart = async (productId) => {
    try {
      const userId = Cookies.get('iduser');
      const response = await axios.post('http://192.168.1.33:3001/removeFromCart', {
        utilisateur_id: userId,
        produit_id: productId,
      });
  
      if (response.status === 200) {
        const updatedCart = await axios.get(`http://192.168.1.33:3001/api/cart/${userId}`);
        const detailedCart = await axios.post('http://192.168.1.33:3001/getProducts', { cart: updatedCart.data });
        setCart(detailedCart.data);
      } else {
        console.error('Erreur lors de la suppression du produit du panier:', response.data.message);
        // Gérer l'erreur en affichant un message à l'utilisateur ou en effectuant d'autres actions nécessaires
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit du panier:', error.message);
      // Gérer l'erreur en affichant un message à l'utilisateur ou en effectuant d'autres actions nécessaires
    }
  };
  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      const userId = Cookies.get('iduser');
      const response = await axios.post('http://192.168.1.33:3001/updateCartItemQuantity', {
        utilisateur_id: userId,
        produit_id: productId,
        quantity,
      });
  
      if (response.status === 200) {
        // Mise à jour réussie, vous pouvez mettre à jour localement la quantité dans le panier
        // Réexécutez votre logique pour récupérer et afficher le panier mis à jour
        await fetchCartDetails();
      } else {
        console.error('Erreur lors de la mise à jour de la quantité du produit dans le panier:', response.data);
        // Gérer l'erreur en affichant un message à l'utilisateur ou en effectuant d'autres actions nécessaires
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité du produit dans le panier:', error.message);
      // Gérer l'erreur en affichant un message à l'utilisateur ou en effectuant d'autres actions nécessaires
    }
  };
  
  

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };


  const login = async () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', '1');
    await fetchCartDetails();
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
        removeFromCart,
        clearCart,
        login,
        logout,
        updateCartItemQuantity,
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
