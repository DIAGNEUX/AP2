import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filtre from '../Assets/icons/Filtre.png';
import Trier from '../Assets/icons/Trier.png';
import plus from '../Assets/icons/plus.png';
import moins from '../Assets/icons/moins.png';
import panier from '../Assets/icons/bag.png'
import like from '../Assets/icons/like_icons.png'
import '../css/Homme.css';
import { Link } from 'react-router-dom';
import { useCart } from '../component/Context';
import { useParams } from 'react-router-dom';

export const Femme = () => {
  const [StickyLeft, setStickyLeft] = useState(false);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(500);
  const [HommeProduit , setHommeProduit]=useState([])
  const API = "http://localhost:3001/produits/femme";
  const API_H_vetements = "http://localhost:3001/produits/femme/vetements";
  const API_H_chaussure = "http://localhost:3001/produits/femme/chaussure";
  const localhost = "http://localhost:3001"
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category)
  const { addToCart: addToCartContext } = useCart()
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    
    let categoryAPI;
    switch (category) {
      case 'vetements':
        categoryAPI = `${API}/vetements`;
        break;
      case 'chaussure':
        categoryAPI = API_H_chaussure;
        break;
      
      default:
        categoryAPI = API;
        break;
    }
 

  
    axios.get(categoryAPI)
      .then((res) => {
        setHommeProduit(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
      });
}
useEffect(() => {
  axios.get(API)
    .then((res) => {
      setHommeProduit(res.data);
      console.log(res.data);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des données de l\'API :', error);
    });
}, []);


  const handleStickyLeft = () => {
    if (window.pageYOffset > 50) {
      setStickyLeft(true);
    } else {
      setStickyLeft(false);
    }
  }

  const handleMinPriceChange = (e) => {
    setMinPrice(parseInt(e.target.value));
  }

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
  }

  useEffect(() => {
    window.addEventListener("scroll", handleStickyLeft);
    return () => {
      window.removeEventListener('scroll', handleStickyLeft);
    }
  }, []);

  useEffect(() => {
    validateRange(minPrice, maxPrice);
  }, [minPrice, maxPrice]);

  function validateRange(minPrice, maxPrice) {
    if (minPrice > maxPrice) {
      [minPrice, maxPrice] = [maxPrice, minPrice];
    }

    const minValue = document.getElementById("min-value");
    const maxValue = document.getElementById("max-value");

    minValue.innerHTML =  minPrice + "€";
    maxValue.innerHTML =  maxPrice + "€";
  }


  
  
  
  return (
    <div className='Homme'>
      <div className='vetements-section'>
        <div>
        <div className="panier">
</div>

      <h1>Vêtements pour Femme </h1>
      <div>
        <ul>
          <li onClick={() => handleCategoryClick('vetements')}>Vetements</li>
          <li onClick={() => handleCategoryClick('chaussure')}>Chaussure</li>
          <li>Short</li>
          <li>Pantalon</li>
          <li>Accessoire</li>
        </ul>
        </div>
      </div>
      </div>
      <div className='Filtre'>
        <div>
          <img src={Filtre} alt="" />Filtre
        </div>
        <div>
          <img src={Trier} alt="" />Trier par
        </div>
      </div>
     

      <div className="wrap-lert-right">
        <div className={`left-homme${StickyLeft ? "sticky" : ""} `}>
          <h2>Filtre</h2>
          <div>
            <ul>
              <li>Couleur <img src={plus} alt="" /></li>
              <li>Taille <img src={plus} alt="" /></li>
              <li>Promo <img src={plus} alt="" /></li>
              <li>
                <div>
                  <p>Prix</p>
                <div className="price-content">
                  <div>
                    <label>Min</label>
                    <p id="min-value">$10</p>
                  </div>
                  <div>
                    <label>Max</label>
                    <p id="max-value">$500</p>
                  </div>
                </div>
                <div className="range-slider">
                  <input
                    type="range"
                    className="min-price"
                    value={minPrice}
                    min="10"
                    max="500"
                    step="10"
                    onChange={handleMinPriceChange}
                  />
                  <input
                    type="range"
                    className="max-price"
                    value={maxPrice}
                    min="10"
                    max="500"
                    step="10"
                    onChange={handleMaxPriceChange}
                  />
                </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='wrap-right-homme'>
          <div className='right-homme'>
            
          {HommeProduit.map((unproduitHomme , index)=> (
          <div className='elem-produit-homme'>
            <div className='image-icon-produit'>
              <div>
            <img className='like'src={like} alt="" />
            </div>
            <div onClick={() => addToCartContext(unproduitHomme)}>
            <img className='panier' src={panier} alt="" />
            </div>
            </div>
            <div className='in-elem-produit-homme'>
            <Link to={`/ProduitDetails/${unproduitHomme.nomProduit}/${unproduitHomme.id}`}>
            {unproduitHomme .images && unproduitHomme .images.length > 0 ? (
              <img src={`${localhost}/uploads/${unproduitHomme.images.split(',')[0]}`} alt="" />
            ) : (
              <img src={`${localhost}/uploads/default-image.jpg`} alt="Default" />
            )}
            <h4>{unproduitHomme.nomProduit}</h4>
            {unproduitHomme.promo == 0 ?(
              <p className='prix'>{unproduitHomme.prix}.00 €</p>
            ):(
              <>
              <div className='wrap-Avant-Maintenant'>
              <p className='prixMaintenant'>{(unproduitHomme.prix - (unproduitHomme.prix * unproduitHomme.promo) / 100).toFixed(2)} €</p>
              <p className='PrixAvant'>{unproduitHomme.prix}.00 €</p>         
              </div>
              <p className='reduction' >{unproduitHomme.promo}% de réduction</p>
              </>
            )}
            </Link>
            </div>
          </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};
