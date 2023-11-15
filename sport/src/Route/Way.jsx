import React from 'react'
import {Routes , Route} from 'react-router-dom'
import { Accueil } from '../Pages/Accueil'
import { Promo } from '../Pages/Promo'
import {Homme} from '../Pages/Homme'
import {Femme} from '../Pages/Femme'
import {Enfant} from '../Pages/Enfant'
import {Accesoires} from '../Pages/Accesoires'
import Connexion from '../component/Connexion'
import { Produit } from '../component/Produit'
import ScrollToTop from '../component/ScroolTop'
import { Admin } from '../Pages/Admin'
import { ProduitDetails } from '../component/ProduitDetails'

export const Way = () => {
  return (
    <div>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Accueil/>} />
          <Route path="/Accueil" element={<Accueil/>} />
          <Route path="/Homme" element={<Homme />} />
          <Route path="/Femme" element={<Femme />} />
          <Route path="/Enfant" element={<Enfant />} />
          <Route path="/Accesoires" element={<Accesoires />} />
          <Route path="/Promo" element={<Promo/>} />
          <Route path="/Connexion" element={<Connexion/>} />
          <Route path="/Produit/:nom/:id" element={<Produit/>} />
          <Route path="/ProduitDetails/:nomProduit/:id" element={<ProduitDetails/>} />
          <Route path="/Admin" element={<Admin/>} />
        </Routes>
    </div>
  )
}
