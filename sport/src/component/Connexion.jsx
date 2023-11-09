import React from 'react';
import '../css/Connexion.css'
import { useEffect } from 'react';

const Connexion = () => {
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
      
        signUpButton.addEventListener('click', () => {
          container.classList.add("right-panel-active");
        });
      
        signInButton.addEventListener('click', () => {
          container.classList.remove("right-panel-active");
        });
   
        return () => {
          signUpButton.removeEventListener('click', () => {
            container.classList.add("right-panel-active");
          });
          signInButton.removeEventListener('click', () => {
            container.classList.remove("right-panel-active");
          });
        };
      }, []);
      
  return (
    <div>
      <div className="wrap_connexion">
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form action="" method="POST">
              <h1>Créer un compte</h1>
              <span>Tous les champs sont obligatoires</span>  
              <input type="text" name="prenom" id="prenom" placeholder="prénom" required />
              <input type="text" name="nom" id="name" placeholder="nom" required />
              <input type="text" name="mail" id="mail" placeholder="Email" required />
              <input type="password" name="password" id="password" placeholder="Password" required />
              <input type="password" name="password-chk" id="password-chk" placeholder="Confirm Password" required />
              <input type="submit" value="Envoyer" />
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="test.php?action=connexion" method="POST">
              <h1>Se connecter</h1>

              <input type="text" name="mail" id="mail" placeholder="Email" required />
              <input type="password" name="password" id="password" placeholder="Password" required />
              <a href="#">Mot de passe oublié</a>
              <input type="submit" value="Envoyer" />
            </form>
          </div>
          
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Re-bienvenue !</h1>
                <p>Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles.</p>
                <button className="ghost" id="signIn">Se connecter</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Bonjour</h1>
                <p>Entrez vos coordonnées personnelles et commencez votre voyage avec nous.</p>
                <button className="ghost" id="signUp">S'inscrire</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
