const express = require('express');
const db = require('../dbb/connexion');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const isAdmin = require('../Middleware/middleware');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(cookieParser());


// exports.getUsers = (req, res) => {
//   const sql = 'SELECT nom, prenom, email FROM user';
//   db.query(sql, (err, data) => {
//     if (err) {
//       console.error('Erreur lors de la sélection des utilisateurs :', err);
//       return res.status(500).json(err);
//     }
//     return res.json(data);
//   });
// };



exports.loginUser = async (req, res) => {
  const { emailUser, passwordUser } = req.body;
  
  if (!emailUser || !passwordUser) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
  } else {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.query(sql, [emailUser], async (err, data) => {
      if (err) {
        console.error('Erreur lors de la sélection des utilisateurs :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      if (data.length === 0) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
      }

      const user = data[0];
      const hashedPassword = user.mdp;

      const passwordMatch = await bcrypt.compare(passwordUser, hashedPassword);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
      }
      
      const userData = {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role 
      };

      return res.json(userData);
    });
  }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const { nom, prenom, email, mdp } = req.body;
  const sqlUser = 'INSERT INTO user (nom, prenom, email, mdp) VALUES (?, ?, ?, ?)';

  db.query(sqlUser, [nom, prenom, email, mdp], (errUser, resultUser) => {
    if (errUser) {
      console.error('Erreur lors de l\'insertion de l\'utilisateur :', errUser);
      return res.status(500).json(errUser);
    }

    return res.status(200).json({ message: 'Utilisateur enregistré avec succès' });
  });
};


