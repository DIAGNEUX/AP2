const express = require('express');
const app = express();
const port = 3001;
const db = require('./dbb/connexion');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('../sport/uploads'));



const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image/')) {
    callback(null, true);
  } else {
    callback(new Error('upload une image.'), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../sport/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});
app.post('/addToCart', async (req, res) => {
  const { utilisateur_id, produit_id } = req.body;

  // Vérifier si l'utilisateur a déjà un panier existant avec ce produit
  const findCartQuery = 'SELECT id, quantite FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
  db.query(findCartQuery, [utilisateur_id, produit_id], (findCartErr, findCartResult) => {
    if (findCartErr) {
      console.error(findCartErr);
      return res.status(500).send('Erreur lors de la recherche du panier de l\'utilisateur');
    }
    if (findCartResult.length > 0) {
      // Mise à jour de la quantité du produit existant
      const updatedQuantity = findCartResult[0].quantite + 1;
      const updateCartQuery = 'UPDATE panier SET quantite = ? WHERE id = ?';
      db.query(updateCartQuery, [updatedQuantity, findCartResult[0].id], (updateCartErr, updateCartResult) => {
        if (updateCartErr) {
          console.error(updateCartErr);
          return res.status(500).send('Erreur lors de la mise à jour du panier');
        }

        console.log('Produit ajouté au panier avec succès !');
        res.status(200).send('Produit ajouté au panier avec succès !');
      });
    } else {
      const addToCartQuery = 'INSERT INTO panier (utilisateur_id, produit_id, quantite) VALUES (?, ?, 1)';
      db.query(addToCartQuery, [utilisateur_id, produit_id], (addToCartErr, addToCartResult) => {
        if (addToCartErr) {
          console.error(addToCartErr);
          return res.status(500).send('Erreur lors de l\'ajout du produit au panier');
        }
        console.log('Produit ajouté au panier avec succès !');
        res.status(200).send('Produit ajouté au panier avec succès !');
      });
    }
  });
});
app.get('/getCart', (req, res) => {
  const utilisateur_id = req.query.utilisateur_id;

  const getCartQuery = 'SELECT id, produit_id, quantite FROM panier WHERE utilisateur_id = ?';
  db.query(getCartQuery, [utilisateur_id], (getCartErr, getCartResult) => {
    if (getCartErr) {
      console.error(getCartErr);
      return res.status(500).send('Erreur lors de la récupération du panier de l\'utilisateur');
    }

    res.status(200).json(getCartResult);
  });
});

app.post('/getProducts', async (req, res) => {
  try {
    const cart = req.body.cart;
    const getProductsQuery = 'SELECT id, nomProduit, prix, images FROM produits WHERE id IN (?)';
    const productIds = cart.map(item => item.produit_id);

    const getProductsResult = await new Promise((resolve, reject) => {
      db.query(getProductsQuery, [productIds], (getProductsErr, getProductsResult) => {
        if (getProductsErr) {
          console.error(getProductsErr);
          reject('Erreur lors de la récupération des détails des produits du panier');
        }
        resolve(getProductsResult);
      });
    });

    const cartWithDetails = cart.map(item => {
      const productDetails = getProductsResult.find(product => product.id === item.produit_id);
      return {
        ...item,
        ...productDetails,
      };
    });

    res.status(200).json(cartWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des détails des produits du panier');
  }
});


app.get('/user', (req, res) => {
  const sql = 'SELECT * FROM user';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Erreur lors de la sélection des utilisateurs :', err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
})

app.post('/connexion', (req, res) => {
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
});
app.post('/user', (req, res) => {
  const { nom, prenom, email, mdp } = req.body;
  const sqlUser = 'INSERT INTO user (nom, prenom, email, mdp) VALUES (?, ?, ?, ?)';
  const sqlCreateUserCart = 'INSERT INTO panier (utilisateur_id) VALUES (LAST_INSERT_ID())';
  const sqlGetLastUserId = 'SELECT LAST_INSERT_ID() as lastUserId';

  db.query(sqlUser, [nom, prenom, email, mdp], (errUser, resultUser) => {
    if (errUser) {
      console.error('Erreur lors de l\'insertion de l\'utilisateur :', errUser);
      return res.status(500).json(errUser);
    }

    db.query(sqlGetLastUserId, (errUserId, resultUserId) => {
      if (errUserId) {
        console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur :', errUserId);
        return res.status(500).json(errUserId);
      }

      const userId = resultUserId[0].lastUserId;

      db.query(sqlCreateUserCart, (errCart, resultCart) => {
        if (errCart) {
          console.error('Erreur lors de la création du panier pour l\'utilisateur :', errCart);
          return res.status(500).json(errCart);
        }

        return res.status(200).json({ message: 'Utilisateur enregistré avec succès' });
      });
    });
  });
});





const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter, 
});

app.get('/produits', (req, res) => {
  const sql = 'SELECT * FROM produits ORDER BY id ASC';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits :', err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});
app.get('/produits/promo', (req, res) => {
  const sql = 'SELECT * FROM produits where promo > 0';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits :', err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});
app.get('/produits/bestSellers', (req, res) => {
  const sql = 'SELECT * FROM produits WHERE best = "best" ORDER BY id ASC ';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits :', err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});
app.get('/produits/:categorie/:typeProduit', (req, res) => {
  const { categorie, typeProduit } = req.params;
  const sql = 'SELECT * FROM produits WHERE categorie = ? AND cateType = ?';
  db.query(sql, [categorie, typeProduit], (err, data) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits :', err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});


app.get('/produits/meme', (req, res) => {
  const nomProduit = req.query.nomProduit;
  const sql = `SELECT * FROM produits WHERE  nomProduit = ?`;
  db.query(sql, [nomProduit], (err, data) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json(err);
    }

    console.log('Query result:', data);
    return res.json(data);
  });
});

app.get('/produits/:categorie', (req, res) => {
  const categorie = req.params.categorie;
  const sql = 'SELECT * FROM produits WHERE categorie = ?';
  db.query(sql, [categorie], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.get('/produits/:id', (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT * FROM produits WHERE id = ?';
  db.query(sql, [productId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.get('/newcollection', (req, res) => {
  const sql = 'SELECT * FROM produits WHERE nomProduit = "Under Armour Haut Zippé Tech Homme"';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits :', err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post('/produits', upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    const { nomProduit, description, categorie, couleur, taille, promo, cateType , prix } = req.body;
    const imagePaths = req.files.map((file) => file.filename).join(',');

    const sql = 'INSERT INTO produits (nomProduit, images, description, categorie, couleur, taille, promo, cateType , prix) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nomProduit, imagePaths, description, categorie, couleur, taille, promo, cateType, prix], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'insertion ');
      } else {
        console.log(result);
        res.status(200).send('Article ajouté avec succès !');
      }
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/produits/:id', (req, res) => {
  const productId = req.params.id;

  const sql = 'DELETE FROM produits WHERE id = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression du produit.');
    } else {
      console.log(result);
      res.status(200).send('Produit supprimé avec succès !');
    }
  });
});

app.put('/produits/:id', upload.array('images', 5), (req, res) => {
  const productId = req.params.id;
  const { nomProduit, description, categorie, couleur, taille, promo, cateType, prix } = req.body;
  let newImagePaths = [];
  if (req.files && req.files.length > 0) {
    newImagePaths = req.files.map((file) => file.filename);
  }
  const updateInfoSql = 'UPDATE produits SET nomProduit=?, description=?, categorie=?, couleur=?, taille=?, promo=?, cateType=?, prix=? WHERE id=?';
  const updateInfoParams = [nomProduit, description, categorie, couleur, taille, promo, cateType, prix, productId];

  db.query(updateInfoSql, updateInfoParams, (infoErr, infoResult) => {
    if (infoErr) {
      console.error(infoErr);
      res.status(500).send('Erreur lors de la mise à jour du produit.');
    } else {
      if (newImagePaths.length > 0) {
        const updateImagesSql = 'UPDATE produits SET images=? WHERE id=?';
        const updatedImagePaths = [...newImagePaths]; 

        db.query(updateImagesSql, [updatedImagePaths.join(','), productId], (imageErr, imageResult) => {
          if (imageErr) {
            console.error(imageErr);
            res.status(500).send('Erreur lors de la mise à jour des images du produit.');
          } else {
            console.log(imageResult);
            res.status(200).send('Produit et images mis à jour avec succès !');
          }
        });
      } else {
        console.log(infoResult);
        res.status(200).send('Produit mis à jour avec succès !');
      }
    }
  });
});





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


