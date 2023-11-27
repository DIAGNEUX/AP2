import React from 'react';
import '../css/Panier.css';
import { useCart } from './Context';
import close from '../Assets/icons/close.png'; 
import like from '../Assets/icons/like_icons.png';
import { useState } from 'react';
const localhost = "http://localhost:3001"
 const Panier = () => {
  const { cart, removeFromCart, removeUnCart, clearCart, addToCart } = useCart();
  const [quantite, setQuantite] = useState(cart.map(() => 1)); 

  const incrementQuantity = (productId) => {
    addToCart(cart.find(item => item.id === productId));
  };

  const decrementQuantity = (productId) => {
    removeUnCart(productId); 
  };

  const calculatTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.prix * item.quantity;
    });
    return totalPrice;
  };

  return (
    <div className='Wrap-Panier'>
      <div className='Panier'>
        <div className='Left-Panier'>
          {cart.map((item, index) => (
            <> 
            <div className='in-Left-Panier' key={index}>
              <div className='produit-panier'>
                <div>
                {item .images && item .images.length > 0 ? (
                  <img className='img-cart' src={`${localhost}/uploads/${item.images.split(',')[0]}`} alt="" />
                  ) : (
                  <img className='img-cart' src={`${localhost}/uploads/default-image.jpg`} alt="Default" />
                  )}
                </div>
                <div>
                  <h4>{item.nomProduit}</h4>
                  <p>{item.prix}.00 €</p>
                </div>
              </div>
              <div className='quantité'>
                <p>quantité</p>
                <div className='increment'>
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  {item.quantity}
                  <button onClick={() => incrementQuantity(item.id)}>+</button></div>
                </div>
              <div className='prix-produit'>prix</div>
              <div className='lesbtn-paniers'>
                <button onClick={() => removeFromCart(item.id)}><img src={close} alt="" /></button>
                <button><img src={like} alt="" /></button>
              </div>
            </div>
            <hr />
            </>
          ))}
          
        </div>
        <div className='Right-Panier'>
          <div className='in-Right-Panier'>
            <h1>Order summary</h1>
            <hr />

            <p>quantité :</p>
            <p>lorem :</p>
            
            <hr />
            <h1>Total prix : {calculatTotalPrice().toFixed(2)} €</h1>
            <hr /> 

          </div>
          <div className='lesbtn-Right-Panier'>
            <button>Passer ma commande</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
