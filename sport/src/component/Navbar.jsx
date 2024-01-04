import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Logo from "../Assets/logo2.png"
import triangle from "../Assets/icons/triangle.png"
import { Admin } from '../Pages/Admin'
import { useCart } from '../component/Context'
import likeIcon from '../Assets/icons/like_icons.png'
import close from '../Assets/icons/close.png'
import { Panier } from './Panier'
import { Essai } from '../Pages/Essai'



import {
  like , bag
} from '../importation/Import'
 const Navbar = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [sticky , setSticky]= useState(false)
  const [showPanier, setShowPanier] = useState(false);
  const [showLike , setShowLike ] = useState(false)
  const localhost = "http://localhost:3001"

  const { isLoggedIn, logout } = useCart(); 


  const handleLogout = () => {
    logout(); 
  };


  const handleScroll = () => {
    if(window.pageYOffset > 90){
      setSticky(true)
    }else{
      setSticky(false)
    }
  }
  useEffect(()=> {
    window.addEventListener('scroll' , handleScroll);
    return ()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  }, [])

  const handlePanierHover = () => {
    setShowPanier(true);
  }

  const handlePanierLeave = () => {
    setShowPanier(false);
  }

  const handleSeepanierMouseEnter = () => {
    setShowPanier(true);
  }

  const handleSeepanierMouseLeave = () => {
    setShowPanier(false);
  }

  const handleLikeHover = () => {
    setShowLike(true);
  }

  const handleLikeLeave = () => {
    setShowLike(false);
  }

  const handleSeeLikeMouseEnter = () => {
    setShowLike(true);
  }

  const handleSeeLikeMouseLeave = () => {
    setShowLike(false);
  }


  
  return (
    <div className="wrap-Navbar">
    <div className={`Navbar${sticky ? 'sticky' : '' }` }>
      <div className='logo'>
        <Link to="/Accueil">
        <img src={Logo} alt="" />
        </Link>
      </div>
        <ul>
            <li><Link to="/Homme">Homme</Link></li>
            <li><Link to="/Femme">Femme</Link></li>
            <li><Link to="/Enfant">Enfant</Link></li>
            <li><Link to="/Promo">Promo</Link></li>
            <li><Link to="/Admin">Admin</Link></li>
            
            
        </ul>
        <div className='wrap-con-btn'>
        {isLoggedIn ? (
          <div>
            <button>Mon compte</button> 
            <button onClick={handleLogout} >Se déconnecter</button> 
          </div>
        ) : (
          <button><Link to="/Connexion">Se connecter</Link></button>
        )}
        <div className='nav-icon'>
          <div>
          <img className='like-nav' src={like} alt="" 
          onMouseEnter={handleLikeHover} 
          onMouseLeave={handleLikeLeave}
          />
          </div>
          <div className='wrap-panier'>
          <img className='Panier-nav' src={bag} alt=""
          onMouseEnter={handlePanierHover} 
          onMouseLeave={handlePanierLeave} />
          <span className='cart-count'>{cart.length}</span>
          </div>
        </div>
        </div>
        
    </div>
    {showPanier && ( 
        <div className='seepanier' 
        onMouseEnter={handleSeepanierMouseEnter}
        onMouseLeave={handleSeepanierMouseLeave}>
          <div><img className='paniertriangle' src={triangle} alt="" /></div>
          <div>
            <ul>
            {cart.map((item, index) => (
              <>
                <li key={index}>
                  {item .images && item .images.length > 0 ? (
                  <img className='img-cart' src={`${localhost}/uploads/${item.images.split(',')[0]}`} alt="" />
                  ) : (
                  <img className='img-cart' src={`${localhost}/uploads/default-image.jpg`} alt="Default" />
                  )}
                  <div className='elem-produit'>
                  <h4>{item.nomProduit}</h4>
                  <p> Taille:XS</p>
                  <p>{item.prix}.00 €</p>
                  </div>
                  <div className='close-like-panier'>
                  <button onClick={() => removeFromCart(item.id)}><img src={close} alt="" /></button>
                  <button><img src={like} alt="" /></button>
                  </div>
                </li>
                <hr />
                </>
              ))}
              <div className='clearbtn'>
                
                <button ><Link to='/Panier'>Voir le panier</Link></button>
                
                </div>
              
      </ul>
            </div>
        </div>
      )}

      {showLike && ( 
              <div className='seeLike' 
              onMouseEnter={handleSeeLikeMouseEnter}
              onMouseLeave={handleSeeLikeMouseLeave}>
                <div><img className='liketriangle' src={triangle} alt="" /></div>
                <div>
                  <h1>j'arrive Favoris</h1>
                </div>
              </div>
            )}

    </div>
    
  )
}
export default Navbar
