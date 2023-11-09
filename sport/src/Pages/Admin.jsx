
import "../css/Admin.css"
import axios from 'axios'
import modify from "../Assets/icons/modify.png";
import del from "../Assets/icons/sup.png";
import nikejunior from '../Assets/Produits/Chaussures/Enfant/reebok-rush-runner-4 Front.jpg'
import nikehomme from '../Assets/Produits/Chaussures/Homme/chaussures-de-trail-running-man white Front.jpg'
import nikefemme from '../Assets/Produits/Chaussures/Femme/chaussures-de-running-femme-kiprun-ks900-jaune Front.jpg'
import add from '../Assets/icons/add.png'
import { useState , useEffect } from 'react'
import close from '../Assets/icons/close.png'

export const Admin = () => {
  const [nom , setnom]= useState('')
  const [description , setdescription]= useState('')
  const [couleur , setcouleur]= useState('')
  const [taille , settaille]=useState('')
  const [prix , setprix]=useState('')
  const [promo , setpromo]=useState('')
  const [categorie , setcategorie]=useState('')
  const [cateType , setcateType]=useState('')
  const [image , setimage]=useState('')
  const [modif , setmodif] = useState(null)
  const [overlayVisible, setOverlayVisible] = useState(false);


  const API= "http://localhost:3001/produits"

  const handleSubmit = async (e) => {
    e.preventDefault();
  
}

  return (
    <div className="wrap-Admin">
    <div className='Admin'>
      <div className="sidebar">
        <div>
          <div className="logo">


          </div>
          <ul>
            <li>Tous les vetement</li>
            <li>Homme</li>
            <li>Femme</li>
            <li>Enfant</li>
            <li>Accesoires</li>
          </ul>
        </div>
      </div>
      <div className="lesproduits">
      <div class="table">
		<div class="table-header">
			<div class="header__item"><a id="name" class="filter__link" href="#">Id</a></div>
			<div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">image</a></div>
			<div class="header__item"><a id="draws" class="filter__link filter__link--number" href="#">nom</a></div>
			<div class="header__item"><a id="losses" class="filter__link filter__link--number" href="#">Promo</a></div>
			<div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">prix</a></div>
      <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#"></a></div>

		</div>
		<div class="table-content">	
			<div class="table-row">		
				<div class="table-data">#4457</div>
				<div class="table-data"><img src={nikejunior} alt="" /></div>
				<div class="table-data">chaussure nike</div>
				<div class="table-data">-20%</div>
				<div class="table-data">40.00€</div>
        <div class="table-data"><button>Delete</button></div>
			</div>
			<div class="table-row">
				<div class="table-data">#4457</div>
				<div class="table-data"><img src={nikefemme} alt="" /> </div>
				<div class="table-data">chaussure nike</div>
				<div class="table-data">-30%</div>
				<div class="table-data">36.00€</div>
        <div class="table-data"><button>delete</button></div>
			</div>
			<div class="table-row">
				<div class="table-data">#4457</div>
				<div class="table-data"><img src={nikehomme} alt="" /></div>
				<div class="table-data">chaussure nike</div>
				<div class="table-data">0</div>
				<div class="table-data">26.00€</div>
        <div class="table-data"><button>Delete</button></div>
			</div>
		</div>	
	</div>

      </div>
    </div>
    <div className="add-button" onClick={() => setOverlayVisible(true)}>
      <img src={add} alt="" />
    </div>
    
    <div>
    {overlayVisible && (
  <div className="wrap-Overlay-add">
    <div className="Overlay-add">
    <div className='wrap-Overlay-add'>
        <div className='Overlay-add'>
        <h1>Ajouter un produit</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex-form">
          <div>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setnom(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />


          <label htmlFor="prix">Prix</label>
          <input
            type="text"
            value={prix}
            onChange={(e) => setprix(e.target.value)}
          />          
          <label htmlFor="categorie">Catégorie</label>
          <input
            type="text"
            value={categorie}
            onChange={(e) => setcategorie(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor="promo">Promo</label>
          <input
            type="text"
            value={promo}
            onChange={(e) => setpromo(e.target.value)}
          />
          <label htmlFor="cateType">CatégorieType</label>
          <input
            type="text"
            value={cateType}
            onChange={(e) => setcateType(e.target.value)}
          />
          <label htmlFor="couleur">Couleur</label>
          <input
            type="text"
            value={couleur}
            onChange={(e) => setcouleur(e.target.value)}
          />
           <label htmlFor="image">Image</label>
          <input
            type="file"
            value={image}
            onChange={(e) => setimage(e.target.value)}
          />
          </div>
          </div>
          <div className="center-submit">
          <input type="submit" value="Submit" />
          </div>
        </form>
        <div className="close-me">
        <button onClick={() => setOverlayVisible(false)}><img src={close} alt="" /></button>
        </div>
      </div>
      </div>
    </div>
  </div>
)}
    
    </div>
    </div>
  )
}
