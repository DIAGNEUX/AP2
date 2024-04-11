import React, { useState , useEffect } from 'react';
import '../css/Panier.css';
import { useCart } from './Context';
import close from '../Assets/icons/close.png';
import like from '../Assets/icons/like_icons.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const localhost = "http://192.168.1.33:3001";

const Panier = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();
  const [orderNote, setOrderNote] = useState('');
  const [orderComment, setOrderComment] = useState('');

  const [orderHistory, setOrderHistory] = useState([]);
  const userId = document.cookie.replace(/(?:(?:^|.*;\s*)iduser\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  console.log(userId);

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    const fetchOrderHistory = async () => {
        try {
            const response = await fetch('http://192.168.1.33:3001/PasserCommande');
            if (response.ok) {
                const data = await response.json();
                setOrderHistory(data); 
            } else {
                console.error('Failed to fetch order history');
            }
        } catch (error) {
            console.error('Error fetching order history:', error);
        }
    };


  const incrementQuantity = (productId) => {
    updateCartItemQuantity(productId, 1);
  };

  const decrementQuantity = (productId) => {
    updateCartItemQuantity(productId, -1);
  };

  const calculatTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.prix * item.quantite;
    });
    return totalPrice;
  };

  const handlePasserCommande = async () => {
   
    const commandDetails = {
      userId: userId, 
      products: cart.map(item => ({ productId: item.id, quantity: item.quantite })),
      note: orderNote,
      commentaire: orderComment
    };
  
    try {
      const response = await fetch('http://192.168.1.33:3001/passerCommande', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commandDetails),
      });
  
      if (response.ok) {
        console.log('Commande passée avec succès !');
        setOrderNote('');
        setOrderComment('');
      } else {
        console.error('Erreur lors de la commande : ', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la commande : ', error);
    }
  };
  
 

  return (
    <div className='Wrap-Panier'>
      <div className='Panier'>
        <div className='Left-Panier'>
          {cart.map((item) => (
            <div className='in-Left-Panier' key={item.id}>
              <div className='produit-panier'>
                <div>
                  {item.images && item.images.length > 0 ? (
                    <img className='img-cart' src={`${localhost}/uploads/${item.images.split(',')[0]}`} alt="" />
                  ) : (
                    <img className='img-cart' src={`${localhost}/uploads/default-image.jpg`} alt="Default" />
                  )}
                </div>
                <div>
                  <h4>{item.nomProduit}</h4>
                  <p>{item.prix}.00 €</p>
                  <div className='quantite-restante'>
                   {item.quantite > item.Quantité
                     ? 'Quantité invalide'
                     : `restante en stock : ${item.Quantité - item.quantite}`}
                 </div>
                </div>
              </div>
              <div className='quantité'>
                <p>quantité</p>
                <div className='increment'>
                <button
                onClick={() => decrementQuantity(item.id)}
                disabled={item.quantite === 1}
                >-</button>
                  {item.quantite}
                  <button onClick={() => incrementQuantity(item.id)} disabled={item.quantite >= item.Quantité}>+</button>
                </div>
              </div>
              <div className='prix-produit'>{item.prix * item.quantite}.00 €</div>
              <div className='lesbtn-paniers'>
                <button onClick={() => removeFromCart(item.id)}><img src={close} alt="" /></button>
                <button><img src={like} alt="" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className='Right-Panier'>
          <div className='in-Right-Panier'>
            <h1>Order summary</h1>
            <hr />
            <p>Quantité : {cart.reduce((acc, item) => acc + item.quantite, 0)}</p>
            <hr />
            <h1>Total prix : {calculatTotalPrice().toFixed(2)} €</h1>
            <hr />
            <div className='form-note'>
              <input
              placeholder="Ajouter une note à la commande"
              type="number"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              name="" id="" />
          
            <textarea
              placeholder="Ajouter un commentaire à la commande"
              value={orderComment}
              onChange={(e) => setOrderComment(e.target.value)}
            />
            </div>
          </div>
          <div className='lesbtn-Right-Panier'>
            <button onClick={handlePasserCommande}>Passer ma commande</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
