import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { 
  leftbg, man, woman, child,
  Data, Back, Forward, bag, like,
  baniere, running, basket, football,
  tennis, training ,Produit
} from '../importation/Import';



export const Accueil = () => {
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
          <img src={leftbg} alt="" />
         </div>
        
         </div>
         <div className="Produits">
          <h1>Categorie</h1>
          <div className='Categories'>
            <div >
              <div className=''>
                <h2>Homme</h2>
                <div className='card_categorie'>
              <img src={man} alt="" />
              <div className='par_cate'>
                <div>
                <ul>
                  <li>Vetements</li>
                  <li>Chaussure</li>
                  <li>Accessoire</li>
                </ul>
                </div>
              </div>
              </div>
              </div>
              </div>

              <div>
                <h2>Femme</h2>
            <div className='card_categorie'>
              <img src={woman} alt="" />
              <div className='par_cate'>
                <div>
                <ul>
                  <li>Vetements</li>
                  <li>Chaussure</li>
                  <li>Accessoire</li>
                </ul>
                </div>
                </div>
              </div>
              </div>
              <div>
                <h2>Enfant</h2>
            <div className='card_categorie'>
              <img src={child} alt="" />
              <div className='par_cate'>
                <div>
                <ul>
                  <li>Vetements</li>
                  <li>Chaussure</li>
                  <li>Accessoire</li>
                </ul>
                </div>
              </div>
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
         <div className='populaire'>
          <div className='Wrap-Autre-produits'>
            <h1>Meilleures ventes</h1>
            <button >Voir d'autres produits</button>
          </div>
          <div className='wrapper-card-img_populaire' >
          <div className='wrap-card-img_populaire' >
            {Data.map((populaire, index)=> (
              <div key={index} className='card-img_populaire'>
                <div className='i'>
                  <div className='iconsbag'>
                  <img src={like} alt="" />
                  </div>
                  <div className='iconsbag'>
                  <img src={bag} alt="" />
                  </div>
                </div>
                <Link to={`/Produit/${populaire.nom}/${populaire.id}`}>
                <div className='theImg'>
                <img className='FrontImg' src={populaire.FrontImg} alt="" />
                <img className='BackImg' src={populaire.BackImg} alt="" />
                </div>
                </Link>
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

         <div className="Wrapper-type-sport">
         <h1>Rcherche par sport</h1>
         <div className='Wrap-type-sport'>
          <div className='type-sport'>
            <div className='one'>
              <img src={training} alt="" />
              <p>Training</p>
            </div>
            <div className='two'>
            <img src={basket} alt="" />
              <p>Basket</p>
            </div>
            <div className='three'>
            <img src={running} alt="" />
              <p>Running</p>
            </div>
            <div className='four'>
            <img src={tennis} alt="" />
              <p>Tennis</p>
            </div>
            <div className='five'>
            <img src={football} alt="" />
              <p>Football</p>
            </div>
          </div>
         </div>
         </div>
         
         </div>
    </div>
  )
}
