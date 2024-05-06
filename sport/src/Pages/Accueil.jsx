import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  leftbg, man, woman, child, 
  Back, Forward, bag, like,
  baniere, running, basket, football,
  tennis, training ,Produit
} from '../importation/Import';
import up_right from "../Assets/up-right.png"
import image1 from "../Assets/imagedec1.png"
import image2 from "../Assets/imagedec2.png"
import image3 from "../Assets/imagedec3.png"
import image4 from "../Assets/imagedec4.png"
import image5 from "../Assets/imagedec5.png"
import image6 from "../Assets/imagedec6.png"

import { useCart } from '../component/Context';

export const Accueil = () => {
  const [bestSellers , setBestSellers] = useState([])
  const [newcollection , setnewcollection] = useState([])
  const API = "http://localhost:3001/api/products/best-sellers";
  const NewcollectionAPI = "http://localhost:3001/api/products/same/Under%20Armour%20Haut%20Zipp%C3%A9%20Tech%20Homme";
  const localhost = "http://localhost:3001"
  const [category, setCategory] = useState('all');
  const { addToCart: addToCartContext } = useCart()
  const encodedImageUrl = encodeURIComponent("http://localhost:3001/uploads/image-1700136110235-Nike Haut de survêtement zippé Running Pacer Femme 1.webp");


  useEffect(() => {
    axios.get(NewcollectionAPI)
      .then((res) => {
        setnewcollection(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
      });
  }, []);

  useEffect(() => {
    axios.get(API)
      .then((res) => {
        setBestSellers(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
      });
  }, []);
  
    useEffect(() => {
        const nextBtn = document.querySelector(".next-btn");
        const prevBtn = document.querySelector(".prev-btn");
        const wrapper = document.querySelector(".wrapper-card-img_populaire");
  
        if (nextBtn && prevBtn && wrapper) {
          nextBtn.addEventListener("click", function() {
            wrapper.scrollLeft += 300;
          });
  
          prevBtn.addEventListener("click", function() {
            wrapper.scrollLeft -= 300;
          });
        }
      });
      const containerVariants = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 2,
            delayChildren: 0.5,
            staggerChildren: 0.3
          }
        }
      };
      
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };

      
  return (
    <div className='Accueil'>
      
    <div className='content-acceuil'>
      <div className='acceuil'>
        <div className="left">
          <div>
      <h1> Explorez le monde du sport avec M2L  </h1>
     <p>Notre passion est de catalyser le potentiel du sport
       pour favoriser la santé et le bien-être.
        Nous nous engageons à rendre le sport accessible à tous, car nous croyons en son pouvoir transformateur.</p> 
          <div className='btn-shop'>
          <button>Decouvrir nos produits</button>
         </div>
         </div>
         </div>
         
         <div className="right">
         <div className='essai-right'>
          <motion.div
            className='essai-images'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            <motion.img
              className='image1'
              src={image1}
              alt=''
              variants={itemVariants}
            />
            <motion.img
              className='image2'
              src={image2}
              alt=''
              variants={itemVariants}
            />
            <motion.img
              className='image3'
              src={image3}
              alt=''
              variants={itemVariants}
            />
            <motion.img
              className='image4'
              src={image4}
              alt=''
              variants={itemVariants}
            />
            <motion.img
              className='image5'
              src={image5}
              alt=''
              variants={itemVariants}
            />
            <motion.img
              className='image6'
              src={image6}
              alt=''
              variants={itemVariants}
            />
          </motion.div>
        </div>
         </div>
        
         </div>
         <div className="Produits">
          <h1>Categorie</h1>
          <div className='Categories'>
            <div >
              <div className=''>
                <div className='card_categorie'>
              <img src={man} alt="" />
              <Link to='/Homme'> <button><img src={up_right} alt="" /><h2>Homme</h2></button></Link>
              </div>
              </div>
              </div>

              <div>
            <div className='card_categorie'>
              <img src={woman} alt="" />
              <Link to='/Femme'><button><img src={up_right} alt="" /><h2>Femme</h2></button></Link>
              </div>
              </div>
              <div>
            <div className='card_categorie'>
              <img src={child} alt="" />
              <Link to='/Enfant'> <button><img src={up_right} alt="" /><h2>Enfant</h2></button></Link>
              </div>
              </div>

          </div>
         </div>
         <div className='Wrap-Promotion'>
          <div className='Promotion'>
          <img src={baniere} alt="" />
          <div  className='Par-promotion'>
          <p>Bénéficiez d'une réduction jusqu'a 50% sur une sélection de produits. 
             Ne tardez pas, cette offre se termine le 5 fevrier . Ensemble, nous pouvons changer le monde. 
             </p>
             <button><Link to="/Promo">Acheter Maintenant</Link> </button>
             </div>
             
          </div>
         </div>

         <div className="NewCollection">
         <h1>Nouvelle collection Under Armour</h1>
         <div className='Wrapper-collection'>
          <div className='wrap-collection'>
            
            {newcollection.map((newcollect, index)=> (
              <>
              
              <div className='each-collection'>
              <Link to={`/ProduitDetails/${newcollect.nomProduit}/${newcollect.id}`}>
                <div className='prod-collection'>
                <img src={`${localhost}/uploads/${newcollect.images.split(',')[0]}`} alt="" />
                </div>
                </Link>
              </div>
              
              </>
            ))}
          </div>
         </div>
         </div>
         <div className='populaire'>
          <div className='Wrap-Autre-produits'>
            <h1>Meilleures ventes</h1>
            <button >Voir d'autres produits</button>
          </div>
          <div className='wrapper-card-img_populaire' >
          <div className='wrap-card-img_populaire' >
            {bestSellers.map((populaire, index)=> (
              <div key={index} className='card-img_populaire'>
                <div className='i'>
                  <div className='iconsbag'>
                  <img src={like} alt="" />
                  </div>
                  <div onClick={() => addToCartContext(populaire)}  className='iconsbag'>
                  <img src={bag} alt="" />
                  </div>
                </div>
                
                <div className='theImg'>
                {populaire .images && populaire .images.length > 0 ? (
                  <>
                  <Link to={`/ProduitDetails/${populaire.nomProduit}/${populaire.id}`}>
                 <img src={`${localhost}/uploads/${populaire.images.split(',')[0]}`} alt="" />
                 <img className='BackImg' src={`${localhost}/uploads/${populaire.images.split(',')[1]}`} alt="" />
                 </Link>
                 </>
                 ) : (
                <img src={`${localhost}/uploads/default-image.jpg`} alt="Default" />
                )}
                </div>
                
              </div>
            ))}
          </div>
          </div>
          <div className='btns_control'>
            <button className='prev-btn'>
              <img src={Back} alt="" />
            </button>
            <button className='next-btn'>
              <img src={Forward} alt="" />
            </button>
          </div>
          
         </div>

        
         
         </div>
    </div>
  )
}
