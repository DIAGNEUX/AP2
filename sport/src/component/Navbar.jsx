import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Logo from "../Assets/logo2.png"
import triangle from "../Assets/icons/triangle.png"
import { Admin } from '../Pages/Admin'
import {
  like , bag
} from '../importation/Import'
 const Navbar = () => {
  const [sticky , setSticky]= useState(false)
  const [showPanier, setShowPanier] = useState(false);
  const [showLike , setShowLike ] = useState(false)

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
            <li><Link to="/Accesoires">Accesoires</Link></li>
            <li><Link to="/Promo">Promo</Link></li>
            <li><Link to="/Admin">Admin</Link></li>
            
        </ul>
        <div className='wrap-con-btn'>
        <button><Link to="/Connexion">Se connecter</Link></button>
        <div className='nav-icon'>
          <img className='like-nav' src={like} alt="" 
          onMouseEnter={handleLikeHover} 
          onMouseLeave={handleLikeLeave}
          />
          <img className='Panier-nav' src={bag} alt=""
          onMouseEnter={handlePanierHover} 
          onMouseLeave={handlePanierLeave} />
        </div>
        </div>
        
    </div>
    {showPanier && ( 
        <div className='seepanier' 
        onMouseEnter={handleSeepanierMouseEnter}
        onMouseLeave={handleSeepanierMouseLeave}>
          <div><img src={triangle} alt="" /></div>
          <div><h1>j'arrive Favoris</h1></div>
        </div>
      )}

      {showLike && ( 
              <div className='seeLike' 
              onMouseEnter={handleSeeLikeMouseEnter}
              onMouseLeave={handleSeeLikeMouseLeave}>
                <div><img src={triangle} alt="" /></div>
                <div>
                  <h1>j'arrive Panier</h1>
                </div>
              </div>
            )}

    </div>
    
  )
}
export default Navbar
