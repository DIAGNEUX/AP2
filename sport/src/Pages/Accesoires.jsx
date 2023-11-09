import React from 'react'
import Filtre from '../Assets/icons/Filtre.png'
import Trier from '../Assets/icons/Trier.png'
import plus from '../Assets/icons/plus.png'
import moins from '../Assets/icons/moins.png'
import { useState , useEffect } from 'react'
import "../css/Homme.css"

export const Accesoires = () => {
  const [StickyLeft , setStickyLeft] = useState(false)
  const handleStickyLeft = () => {
    if(window.pageYOffset > 50 ){
      setStickyLeft(true)
    }else{
      setStickyLeft(false)
    }
  }
  
  useEffect(() => {
    window.addEventListener("scroll" , handleStickyLeft)
    return ()=> {
      window.removeEventListener('scroll' ,handleStickyLeft)
    }
  })
  return (
    <div className='Homme'>
      <h1>Vetements pour homme (nbr)</h1>
      <div className='Filtre'>
        <div><img src={Filtre} alt="" />Filtre</div>
        <div><img src={Trier} alt="" />Trier par</div>
      </div>
      <div className="tag-homme">
        <ul>
          <li>Tous les Vetements</li>
          <li>Vetements</li>
          <li>Short</li>
          <li>Pantalon</li>
          <li>Chaussure</li>
        </ul>
      </div>

      <div className="wrap-lert-right">
      <div className={`left-homme${StickyLeft ? "sticky" : ""} `}>
        <h2>Filtre</h2>
        <div>
          <ul>
            <li>Couleur <img src={plus} alt="" /></li>
            <li>Taille<img src={plus} alt="" /></li>
            <li>Promo<img src={plus} alt="" /></li>
            <li>Prix<img src={plus} alt="" /></li>
          </ul>
        </div>

      </div>
      <div className='right-homme'>
        <div></div>
        <div></div>
        <div></div>
      </div>
      </div>

    </div>

  )
}
