import "../css/Profil.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import utilisateur from "../Assets/icons/icons8-utilisateur-50.png"
import produit from "../Assets/icons/icons8-produit-50.png"
import commande from "../Assets/icons/icons8-ordre-d'achat-50.png"
import Cookies from 'js-cookie';
export const Profil = () => {
  const localhost = "http://192.168.1.33:3001";
  const [selectedMenuItem, setSelectedMenuItem] = useState('commande');
  const [showItem, setShowItem] = useState(false);


  const handleShowItem = () => {
    setShowItem(!showItem);
  }
  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const userId = Cookies.get('iduser');
    console.log(userId)

    if (userId) {
      fetchUserOrderHistory(userId);

    }
  }, []);

  const fetchUserOrderHistory = async (userId) => {
    try {
      const response = await axios.get(`http://192.168.1.33:3001/api/user-history/${userId}`);
      setCommandes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique des commandes:', error);
    }
  };
  const groupCommandsById = (commands) => {
    const groupedCommands = {};
    commands.forEach((command) => {
      if (groupedCommands[command.commande_id]) {
        groupedCommands[command.commande_id].push(command);
      } else {
        groupedCommands[command.commande_id] = [command];
      }
    });
    return groupedCommands;
  };
  
  const groupedCommands = groupCommandsById(commandes);

 
console.log(commandes)
console.log(commandes.produits)
  return (
    <div className="wrap-Admin">
      <div className='Admin'>
        <div className="sidebar">
          <div>
            <div className="logo"></div>
            <ul>
            <li onClick={() => handleMenuClick('compte')}><img src={produit} alt="" /> Mon compte</li>
              <li onClick={() => handleMenuClick('favoris')}> <img src={utilisateur} alt="" /> favoris</li>
              <li onClick={() => handleMenuClick('commande')}> <img src={commande} alt="" />Mes Commandes</li>
            </ul>
          </div>
        </div>
        <div className="lesproduits">
        {selectedMenuItem === 'compte' && (
            <div className="table">
                <h1>mes données</h1>
          </div>
          )}
          {selectedMenuItem === 'favoris' && (
            <div className="table_utilisateur">
              <ul>
                <h1>mes produits fav</h1>
              </ul>
            </div>
          )}
          {selectedMenuItem === 'commande' && (
  <div className="table">
    <div className="commande-table">
    {commandes.length > 0 && <h1>Mon historique de Commande</h1>}
    <div>
      {Object.keys(groupedCommands).map((commandId) => (
        <div className="display-commande" key={commandId}>
            <div className="header">
            <div className="viewcommand">
          <h2>Commande {commandId}</h2>
          <div className="total">
          <button onClick={() => setShowItem(!showItem)}>Voir les produits</button>
          </div>
          </div>
          <div className="note">
          <p> <span>Note</span> : {groupedCommands[commandId][0].note}</p>
          <p> <span>Commentaire</span>: {groupedCommands[commandId][0].commentaire}</p>
          </div>
          </div>
          {groupedCommands[commandId].map((commande) => (
            <div key={commande.produit_id} className={showItem ? "product-item" : "Mask-produit"}>
              <div className="product-image">
                {commande.images && commande.images.length > 0 ? (
                  <img src={`${localhost}/uploads/${commande.images.split(',')[0]}`} alt={commande.nomProduit} />
                ) : (
                  <img src={`${localhost}/uploads/default-image.jpg`} alt="Default" />
                )}
              </div>
              <div className="product-details">
                <p>{commande.nomProduit}</p>
                <p>Quantité : {commande.quantite}</p>
                <p>Prix : {commande.prix}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
  </div>
)}

          
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};