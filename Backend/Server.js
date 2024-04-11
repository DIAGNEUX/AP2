const express = require('express');
const app = express();
const port = 3001;
const db = require('./dbb/connexion');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const userRoutes = require('./Routes/UserRoutes'); 
const productRouter = require('./Routes/ProductRoutes');
const panierRouter = require('./Routes/PanierRoutes');


app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('../sport/uploads'));
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

// Chemin de l'image par défaut
const defaultImagePath = 'image_default_image.jpg';

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image/')) {
    callback(null, true);
  } else {
    console.error('Type MIME non pris en charge :', file.mimetype);
    // Utilisez l'image par défaut si le type MIME n'est pas pris en charge
    req.fileValidationError = 'Type MIME non pris en charge';
    req.defaultImageUsed = true; // Indique que l'image par défaut est utilisée
    callback(null, true); // Permet le téléchargement malgré le type MIME non pris en charge
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (req.defaultImageUsed) {
      // Si l'image par défaut est utilisée, pas besoin de sauvegarder le fichier
      return callback(null, ''); // Ne sauvegarde pas le fichier
    } else {
      callback(null, '../sport/uploads');
    }
  },

  filename: (req, file, callback) => {
    if (req.defaultImageUsed) {
      // Utilisez le nom de fichier de l'image par défaut
      callback(null, defaultImagePath);
    } else {
      const extension = MIME_TYPES[file.mimetype];
      if (!extension) {
        callback(new Error('Type MIME non pris en charge'), false);
      } else {
        callback(null, `image-${Date.now()}-${file.originalname}.${extension}`);
      }
    }
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});


app.use(express.json());

// Middleware pour gérer les requêtes CORS
app.use(cors());

// Middleware pour analyser les corps de requête au format JSON
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRouter);
app.use('/api/cart', panierRouter);

const localhost = "http://localhost:3001"

app.post('/api/products', upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      console.log('Aucun fichier téléchargé.');
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    console.log('Fichiers téléchargés:', req.files);
    const mimeTypes = req.files.map(file => file.mimetype);
    console.log('MimeTypes des images sélectionnées :', mimeTypes);

    const { nomProduit, description, categorie, couleur, taille, promo, cateType, prix } = req.body;
    console.log('Données du produit:', { nomProduit, description, categorie, couleur, taille, promo, cateType, prix });

    const imagePaths = req.files.map((file) => file.filename).join(',');
    console.log('Chemins des images:', imagePaths);

    const sql = 'INSERT INTO produits (nomProduit, images, description, categorie, couleur, taille, promo, cateType, prix) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nomProduit, imagePaths, description, categorie, couleur, taille, promo, cateType, prix], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données:', err);
        res.status(500).send('Erreur lors de l\'insertion ');
      } else {
        console.log('Résultat de l\'insertion:', result);
        res.status(200).send('Article ajouté avec succès !');
      }
    });
  } catch (error) {
    console.error('Erreur lors du traitement de l\'envoi:', error);
    res.status(500).send('Internal Server Error');
  }
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

app.post('/passerCommande', async (req, res) => {
  try {
      const { userId, products, note, commentaire } = req.body;

      const userOrderHistoryQuery = 'SELECT * FROM commande WHERE utilisateur_id = ?';
      const userOrderHistory = await new Promise((resolve, reject) => {
          db.query(userOrderHistoryQuery, [userId], (err, result) => {
              if (err) {
                  console.error(err);
                  reject('Erreur lors de la récupération de l\'historique des commandes de l\'utilisateur');
              } else {
                  resolve(result);
              }
          });
      });

      const commandeInsertQuery = 'INSERT INTO commande (utilisateur_id, note, commentaire) VALUES (?, ?, ?)';
      await new Promise((resolve, reject) => {
          db.query(commandeInsertQuery, [userId, note, commentaire], async (err, result) => {
              if (err) {
                  console.error(err);
                  reject('Erreur lors de l\'insertion de la nouvelle commande');
              } else {
                  for (const product of products) {
                      const { productId, quantity } = product;
                      const commandeProduitInsertQuery = 'INSERT INTO commande_produit (commande_id, produit_id, quantite) VALUES (?, ?, ?)';
                      await new Promise((resolve, reject) => {
                          db.query(commandeProduitInsertQuery, [result.insertId, productId, quantity], (err, result) => {
                              if (err) {
                                  console.error(err);
                                  reject('Erreur lors de l\'ajout du produit à la commande');
                              } else {
                                  resolve();
                              }
                          });
                      });
                  }
                  resolve();
              }
          });
      });

      res.status(200).json({ orderHistory: userOrderHistory, message: 'Commande passée avec succès' });
  } catch (error) {
      console.error('Erreur lors du passage de la commande :', error);
      res.status(500).send('Une erreur s\'est produite lors du passage de la commande');
  }
});
app.get('/api/user-history/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const userOrderHistoryQuery = `
      SELECT 
        c.id AS commande_id,
        cp.produit_id,
        p.nomProduit,
        p.prix,
        p.images,
        cp.quantite,
        c.note,
        c.commentaire
      FROM commande c
      JOIN commande_produit cp ON c.id = cp.commande_id
      JOIN produits p ON cp.produit_id = p.id
      WHERE c.utilisateur_id = ?;
    `;

    db.query(userOrderHistoryQuery, [userId], (err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération de l\'historique des commandes de l\'utilisateur:', err);
        res.status(500).send('Erreur lors de la récupération de l\'historique des commandes de l\'utilisateur');
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique des commandes de l\'utilisateur:', error);
    res.status(500).send('Erreur lors de la récupération de l\'historique des commandes de l\'utilisateur');
  }
});
app.get('/api/admin-all-orders', async (req, res) => {
  try {
    const allOrdersQuery = `
      SELECT 
        c.id AS commande_id,
        c.utilisateur_id,
        u.nom AS nom_utilisateur,
        GROUP_CONCAT(cp.produit_id) AS produit_ids,
        GROUP_CONCAT(p.nomProduit) AS noms_produits,
        GROUP_CONCAT(p.prix) AS prix_produits,
        GROUP_CONCAT(p.images) AS images_produits,
        GROUP_CONCAT(cp.quantite) AS quantites_produits,
        c.note,
        c.commentaire,
        c.status
      FROM commande c
      JOIN commande_produit cp ON c.id = cp.commande_id
      JOIN produits p ON cp.produit_id = p.id
      JOIN user u ON c.utilisateur_id = u.id
      GROUP BY c.id
      ORDER BY c.id DESC; 
    `;

    db.query(allOrdersQuery, (err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération de toutes les commandes:', err);
        res.status(500).send('Erreur lors de la récupération de toutes les commandes');
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les commandes:', error);
    res.status(500).send('Erreur lors de la récupération de toutes les commandes');
  }
});





app.post('/getProducts', async (req, res) => {
  try {
    const cart = req.body.cart;
    const getProductsQuery = 'SELECT id, nomProduit, prix, images, Quantité FROM produits WHERE id IN (?)';
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
app.post('/updateCartItemQuantity', async (req, res) => {
  const { utilisateur_id, produit_id, quantity } = req.body;

  try {
    // Vérifiez si le produit existe dans le panier
    const findCartQuery = 'SELECT id, quantite FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
    const findCartResult = await new Promise((resolve, reject) => {
      db.query(findCartQuery, [utilisateur_id, produit_id], (findCartErr, findCartResult) => {
        if (findCartErr) {
          console.error(findCartErr);
          reject('Erreur lors de la recherche du panier de l\'utilisateur');
        }
        resolve(findCartResult);
      });
    });

    if (findCartResult.length > 0) {
      // Mettez à jour la quantité du produit dans le panier
      const updatedQuantity = findCartResult[0].quantite + quantity;
      const updateCartQuery = 'UPDATE panier SET quantite = ? WHERE id = ?';
      await new Promise((resolve, reject) => {
        db.query(updateCartQuery, [updatedQuantity, findCartResult[0].id], (updateCartErr, updateCartResult) => {
          if (updateCartErr) {
            console.error(updateCartErr);
            reject('Erreur lors de la mise à jour du panier');
          }
          resolve();
        });
      });

      res.status(200).send(`Quantité mise à jour avec succès (${updatedQuantity})`);
    } else {
      res.status(404).send('Produit non trouvé dans le panier');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la quantité du produit dans le panier:', error);
    res.status(500).send('Erreur lors de la mise à jour de la quantité du produit dans le panier');
  }
});
app.post('/removeFromCart', async (req, res) => {
  const { utilisateur_id, produit_id } = req.body;

  try {
    // Effectuez la suppression du produit du panier dans la base de données
    const removeFromCartQuery = 'DELETE FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
    await new Promise((resolve, reject) => {
      db.query(removeFromCartQuery, [utilisateur_id, produit_id], (removeErr, removeResult) => {
        if (removeErr) {
          console.error(removeErr);
          reject('Erreur lors de la suppression du produit du panier');
        }
        resolve();
      });
    });

    res.status(200).send('Produit supprimé du panier avec succès !');
  } catch (error) {
    console.error('Erreur lors de la suppression du produit du panier:', error);
    res.status(500).send('Erreur lors de la suppression du produit du panier');
  }
});
// Écoute du port
module.exports = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
