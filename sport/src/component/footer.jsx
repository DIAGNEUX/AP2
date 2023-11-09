import React from 'react';
import Logo from "../Assets/logo2.png"
import Facebook from '../Assets/icons/facebook.png'
import Insta from '../Assets/icons/instagram.png'
import X from '../Assets/icons/twitter.png'
const Footer = () => {
  return (
    <footer>

      <div>
        <div>
            <img src={Logo} alt="" />
            <ul className='social-icons'>
                <li><a href=""><img src={Facebook} alt="" /></a></li>
                <li><a href=""><img src={Insta} alt="" /></a></li>
                <li><a href=""><img src={X} alt="" /></a></li>
            </ul>

        </div>
      </div>
      <div className='propos'>
      <h3>A propos</h3>
      <ul>
          <li><a href="/categories">Notre histoire</a></li>
          <li><a href="/categories">Notre mission</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/contact">FAQS</a></li>

        </ul>
       
      </div>
     
      <div className='Legal'>
        <h3>Légal</h3>
        <ul>
          <li><a href="/politique-confidentialite">Politique de confidentialité</a></li>
          <li><a href="/conditions-generales">Conditions générales de vente</a></li>
          <li><a href="/conditions-generales">Politique d'avis en ligne</a></li>
          <li><a href="/conditions-generales">Accessibilité</a></li>
        </ul>
      </div>

      <div>
        <h3>Inscrivez-vous à notre newsletter </h3>
        <form>
          <input type="email" placeholder="Votre e-mail" />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
     

    </footer>
  );
};

export default Footer;
