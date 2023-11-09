import React from 'react';
import { useParams } from 'react-router-dom';
import Data from '../data/Data';
import "../css/Produit.css"

export const Produit = () => {
  const { nom , id } = useParams();
  const produit = Data.find(item => item.nom === nom && item.id == id);

  return (
    <div className='wrap-Produit-detail'>
      <div className='Produit-detail'>
      {produit ? (
        <div className='Produit-detail-flex'>
          <div className='Produit-detail-left'>
            <div className='in-detail-left'>
            <div className='other-img'>
            <img src={produit.FrontImg} alt="" />
            <img src={produit.BackImg} alt="" />
            </div>
            <div className='display-img' >
              <img src={produit.FrontImg} alt="" />
            </div>
            </div>
          
          </div>
          <div className='Produit-detail-right'>
          <h1>{produit.nom}</h1>
          <h2>120 €</h2>
          <div className='couleur'>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className='taille'>
          <h4>Selectionner la taille</h4>
          <ul>
          <li>
                <input type="checkbox" id="XS" name="size" />
                <label for="XS">XS</label>
              </li>
              <li>
                <input type="checkbox" id="S" name="size" />
                <label for="S">S</label>
              </li>
              <li>
                <input type="checkbox" id="M" name="size" />
                <label for="M">M</label>
              </li>
              <li>
                <input type="checkbox" id="L" name="size" />
                <label for="L">L</label>
              </li>
              <li>
                <input type="checkbox" id="XL" name="size" />
                <label for="XL">XL</label>
              </li>
              <li>
                <input type="checkbox" id="XXL" name="size" />
                <label for="XXL">XXL</label>
              </li>
          </ul>
          </div>
          <div className="add-fav">
            <button className='addPanier'>Ajouter au panier</button>
            <button className='fav'>Ajouter au favoris</button>
          </div>
          </div>
        </div>
      ) : (
        <p>Produit non trouvé.</p>
      )}
      </div>
    </div>
  );
}
