import React, { useEffect, useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import Logo from "../Assets/logo2.png"
import triangle from "../Assets/icons/triangle.png"
import { Admin } from '../Pages/Admin'
import { useCart } from '../component/Context'
import likeIcon from '../Assets/icons/like_icons.png'
import close from '../Assets/icons/close.png'
import { Panier } from './Panier'
import { Essai } from '../Pages/Essai'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

 

import {
  like , bag
} from '../importation/Import'
 const Navbar = () => {
  const Navigate = useNavigate();
  const { cart, removeFromCart, clearCart, setCart, saveCartToLocalStorage } = useCart();
  const [sticky , setSticky]= useState(false)
  const [showPanier, setShowPanier] = useState(false);
  const [showLike , setShowLike ] = useState(false)
  const localhost = "http://192.168.1.33:3001"

  const { isLoggedIn, logout } = useCart(); 
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');


  const handleLogout = () => {
    Cookies.remove('userRole');
    Cookies.remove('userNom');
    logout();
    Navigate('/Accueil');
    window.location.reload();
    setUserRole('');
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

  
// ...

  useEffect(() => {
    const role = Cookies.get('userRole');
    const userName = Cookies.get('userNom');
    console.log(role)
    setUserRole(role);
    console.log(userName)
    setUserName(userName);
  }, []);

  
  return (
    <div className="wrap-Navbar">
    <div className={`Navbar${sticky ? 'sticky' : '' }` }>
      <div className='logo'>
        <Link to="/Accueil">
        <img src={Logo} alt="" />
        </Link>
      </div>
      <ul>
      {isLoggedIn ? (
        <>
         {userRole === '0' ? (
          <>
          <ul>
            <li><Link to="/Homme">Homme</Link></li>
            <li><Link to="/Femme">Femme</Link></li>
            <li><Link to="/Enfant">Enfant</Link></li>
            <li><Link to="/Promo">Promo</Link></li>
            </ul>
          </>
        ) : userRole === '1' ? (
          <ul className='AdminUL'>
          <li>
          
          </li>
          </ul>
        ) : null
        }
     </>
        ) : (
          <ul>
             <li><Link to="/Homme">Homme</Link></li>
            <li><Link to="/Femme">Femme</Link></li>
            <li><Link to="/Enfant">Enfant</Link></li>
            <li><Link to="/Promo">Promo</Link></li>
          </ul>
          
        )}
    
  </ul>
        <div className='wrap-con-btn'>
        {isLoggedIn ? (
          <div>
            <button><Link to="/Profil">{userName}</Link></button> 
            <button onClick={handleLogout} >Se déconnecter</button> 
          </div>
        ) : (
          <button><Link to="/Connexion">Se connecter</Link></button>
        )}
        <div className='nav-icon'>
        {userRole === '0' ? (
          <>
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
           </>
        ):(
          <>
          </>
        )}
          
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
                  <p>quantité: {item.quantite}</p>
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
