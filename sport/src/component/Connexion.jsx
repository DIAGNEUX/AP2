import React from 'react';
import '../css/Connexion.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './Context';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
const Connexion = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [mdpcheck, setMdpcheck] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  
  const { login } = useCart();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mdp !== mdpcheck) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(mdp, saltRounds);

    const userData = {nom, prenom, email, mdp:hashedPassword };

    try {
      const response = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Données envoyées avec succès');
        setNom('');
        setPrenom('');
        setEmail('');
        setMdp('');
        setMdpcheck('');
        navigate('/Connexion');
        window.location.reload();
      } else {
        console.error('Échec de l\'envoi des données');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  }
  

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
  
    const userData = {
      emailUser: emailUser, 
      passwordUser: passwordUser, 
    };
    console.log(userData);
  
    try {
      const response = await fetch('http://localhost:3001/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.role);
        console.log('Connecté avec succès');
        setEmailUser('');
        setPasswordUser('');
        Cookies.set('userRole', data.role, { expires: 7 }); 
        Cookies.set('userNom', data.nom, { expires: 7 })
        Cookies.set('iduser', data.id, { expires: 7 })
        console.log(data.nom)
        if (data.role === 1) {
          navigate('/Admin');
          console.log(data.role)
          window.location.reload()
        } else if (data.role === 0) {
          navigate('/Accueil');
          window.location.reload()
        } else {
          console.error('Rôle non défini ou non autorisé');
        }
        login();
      } else {
        console.error('Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
  
  
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
            <form action="" method="POST" onSubmit={handleSubmit}>
              <h1>Créer un compte</h1>
              <span>Tous les champs sont obligatoires</span>  
              <input type="text" name="prenom" id="prenom" placeholder="prénom" 
              onChange={(e) => setPrenom(e.target.value)} required />
              <input type="text" name="nom" id="name" placeholder="nom" 
              onChange={(e) => setNom(e.target.value)}
              required />
              <input type="text" name="email" id="mail" placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
               required />
              <input type="password" name="mdp" id="password" placeholder="Password"
              onChange={(e) => setMdp(e.target.value)}
               required />
              <input type="password" name="mdpcheck" id="password-chk" placeholder="Confirm Password"
              onChange={(e) => setMdpcheck(e.target.value)} 
              required />
              <input type="submit" value="s'inscrire" />
            </form>
          </div>
          <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
          <h1>Se connecter</h1>
          <input
            type="text"
            name="emailUser"
            id="emailUser"
            placeholder="Email"
            onChange={(e) => setEmailUser(e.target.value)}
            required
          />
          <input
            type="password"
            name="passwordUser"
            id="passwordUser"
            placeholder="Password"
            onChange={(e) => setPasswordUser(e.target.value)}
            required
          />
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
