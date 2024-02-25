import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './Context';
import "../css/Produit.css"
import axios from 'axios'
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';


export const ProduitDetails = () => {
    const { cart, addToCart } = useCart(); 
    const [HommeProduit , setHommeProduit]=useState([])
    const [ProduitsSimilaires, setProduitsSimilaires] = useState([]);
    const { nomProduit , id } = useParams();
    const produit = HommeProduit.find(item => item.nomProduit === nomProduit && item.id == id);  
    const API = "http://localhost:3001/api/products";
    const localhost = "http://localhost:3001";
    const [TailleSelect, setTailleSelect] = useState('');
    const [Showproduit, setShowProduit] = useState({ displayedImage: 'default-image.jpg' });
    const handleClickImage = (image) => {
        setShowProduit({ ...Showproduit, displayedImage: image });
      };
      const handleSizeSelect = (size) => {
        setTailleSelect(size);
      }; 
    useEffect(() => {
        if (produit) {
          axios
            .get(`http://localhost:3001/api/products/same/${produit.nomProduit}`)
            .then((res) => {
              setProduitsSimilaires(res.data);
              console.log(res.data);
            })
            .catch((error) => {
              console.error('Erreur lors de la récupération des produits similaires :', error);
            });
    
        
          setShowProduit({ ...Showproduit, displayedImage: produit.images.split(',')[0] });
        }
      }, [produit]);

    useEffect(() => {
        axios.get(API)
          .then((res) => {
            setHommeProduit(res.data);
          })
          .catch((error) => {
            console.error('Erreur  :', error);
          });
      }, []); 
      
  
  const handleAddToCart = () => {
    if (produit) {
      addToCart(produit); 
    }
  };   
 
  return (
    <div className='wrap-Produit-detail'>
      <div className='Produit-detail'>
      {produit ? (
        <div className='Produit-detail-flex'>
          <div className='Produit-detail-left'>
            <div className='in-detail-left'>
            <div className='other-img'>
                {produit.images && produit.images.length > 0 ? (
                 produit.images.split(',').map((image, index) => (
                <img  onClick={() => handleClickImage(image)} key={index} src={`${localhost}/uploads/${image}`} alt={`Image ${index}`} />
                ))
                ) : (
                <img src={`${localhost}/uploads/default-image.jpg`} alt="Default" />
                )}

            </div>
            <div className='display-img'>
                {Showproduit && Showproduit.displayedImage &&(
                <img src={`${localhost}/uploads/${Showproduit.displayedImage}`} alt='Affiche toi'/>
                )}
            </div>
            </div>
          
          </div>
          <div className='Produit-detail-right'>
            <div className='in-Produit-detail-right'>
          <h1>{produit.nomProduit}</h1>
          {produit.promo == 0 ?(
              <h2 className='prix'>{produit.prix}.00 €</h2>
            ):(
              <>
              <div className='wrap-Avant-Maintenant'>
              <h2 className='prixMaintenant'>{(produit.prix - (produit.prix * produit.promo) / 100).toFixed(2)} €</h2>
              <h3 className='PrixAvant'>{produit.prix}.00 €</h3>         
              </div>
              <p className='reduction' >{produit.promo}% de réduction</p>
              </>
            )}
          <div className='couleur'>
            <h4>Autres couleurs</h4>
            <ul>
            {ProduitsSimilaires.map((similaire, index) => (
                     <Link to={`/produitDetails/${similaire.nomProduit}/${similaire.id}`}>
                    <li key={index}>
                      <img
                        src={`${localhost}/uploads/${similaire.images.split(',')[0]}`}
                        alt={`Couleur ${index}`}
                      />
                    </li>
                    </Link>
                  ))}
            </ul>
          </div>
          <div className='taille'>
          <h4>Selectionner la taille</h4>
          <ul>
          <li>
          {produit.taille && produit.taille.length > 0 ? (
           produit.taille.split(',').map((size, index) => (
           <div key={index} className="taille-item">
         <label
                  htmlFor={size}
                  className={TailleSelect === size ? 'selected' : ''}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                  <input type="checkbox" id={size} name="size" />
                </label>
              </div>
               ))
             ) : (
               <p></p>
             )}
              </li>
          </ul>
          </div>
          <div className="add-fav">
            <button className='addPanier' onClick={handleAddToCart}>Ajouter au panier</button>
            <button className='fav' >Ajouter au favoris</button>
          </div>
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
