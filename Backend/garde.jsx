{/* <div className='Left-Panier'>
          {cart.map((item) => (
            <div className='in-Left-Panier' key={item.id}>
              <div className='produit-panier'>
                <div>
                  {item.images && item.images.length > 0 ? (
                    <img className='img-cart' src={`${localhost}/uploads/${item.images.split(',')[0]}`} alt="" />
                  ) : (
                    <img className='img-cart' src={`${localhost}/uploads/default-image.jpg`} alt="Default" />
                  )}
                </div>
                <div>
                  <h4>{item.nomProduit}</h4>
                  <p>{item.prix}.00 €</p>
                  <div className='quantite-restante'>
                   {item.quantite > item.Quantité
                     ? 'Quantité invalide'
                     : `restante en stock : ${item.Quantité - item.quantite}`}
                 </div>
                </div>
              </div>
              <div className='quantité'>
                <p>quantité</p>
                <div className='increment'>
                <button
                onClick={() => decrementQuantity(item.id)}
                disabled={item.quantite === 1}
                >-</button>
                  {item.quantite}
                  <button onClick={() => incrementQuantity(item.id)} disabled={item.quantite >= item.Quantité}>+</button>
                </div>
              </div>
              <div className='prix-produit'>{item.prix * item.quantite}.00 €</div>
              <div className='lesbtn-paniers'>
                <button onClick={() => removeFromCart(item.id)}><img src={close} alt="" /></button>
                <button><img src={like} alt="" /></button>
              </div>
            </div>
          ))}
        </div> */}
















// const express = require('express');
// const app = express();
// const port = 3001;
// const db = require('./dbb/connexion');
// const cors = require('cors');
// const multer = require('multer');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');



// app.use(express.json());
// app.use(cors());

// app.use('/uploads', express.static('../sport/uploads'));



// const fileFilter = (req, file, callback) => {
//   if (file.mimetype.startsWith('image/')) {
//     callback(null, true);
//   } else {
//     callback(new Error('upload une image.'), false);
//   }
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, '../sport/uploads');
//   },
//   filename: (req, file, callback) => {
//     callback(null, `image-${Date.now()}-${file.originalname}`);
//   },
// });
// app.post('/addToCart', async (req, res) => {
//   const { utilisateur_id, produit_id } = req.body;
//   const getProductPriceQuery = 'SELECT prix FROM produits WHERE id = ?';
//   db.query(getProductPriceQuery, [produit_id], (getPriceErr, getPriceResult) => {
//     if (getPriceErr) {
//       console.error(getPriceErr);
//       return res.status(500).send('Erreur lors de la récupération du prix du produit');
//     }

//     const produit_prix = getPriceResult[0].prix;

//     const findCartQuery = 'SELECT id, quantite, prix FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
//     db.query(findCartQuery, [utilisateur_id, produit_id], (findCartErr, findCartResult) => {
//       if (findCartErr) {
//         console.error(findCartErr);
//         return res.status(500).send('Erreur lors de la recherche du panier de l\'utilisateur');
//       }

//       if (findCartResult.length > 0) {
//         const updatedQuantity = findCartResult[0].quantite + 1;
//         const updatedTotalPrice = findCartResult[0].prix + produit_prix;
//         const updateCartQuery = 'UPDATE panier SET quantite = ?, prix = ? WHERE id = ?';
//         db.query(updateCartQuery, [updatedQuantity, updatedTotalPrice, findCartResult[0].id], (updateCartErr, updateCartResult) => {
//           if (updateCartErr) {
//             console.error(updateCartErr);
//             return res.status(500).send('Erreur lors de la mise à jour du panier');
//           }

//           console.log('Produit ajouté au panier avec succès !');
//           res.status(200).send('Produit ajouté au panier avec succès !');
//         });
//       } else {
//         const addToCartQuery = 'INSERT INTO panier (utilisateur_id, produit_id, quantite, prix) VALUES (?, ?, 1, ?)';
//         db.query(addToCartQuery, [utilisateur_id, produit_id, produit_prix], (addToCartErr, addToCartResult) => {
//           if (addToCartErr) {
//             console.error(addToCartErr);
//             return res.status(500).send('Erreur lors de l\'ajout du produit au panier');
//           }
//           console.log('Produit ajouté au panier avec succès !');
//           res.status(200).send('Produit ajouté au panier avec succès !');
//         });
//       }
//     });
//   });
// });
// app.get('/getCart', (req, res) => {
//   const utilisateur_id = req.query.utilisateur_id;

//   const getCartQuery = 'SELECT id, produit_id, quantite FROM panier WHERE utilisateur_id = ?';
//   db.query(getCartQuery, [utilisateur_id], (getCartErr, getCartResult) => {
//     if (getCartErr) {
//       console.error(getCartErr);
//       return res.status(500).send('Erreur lors de la récupération du panier de l\'utilisateur');
//     }

//     res.status(200).json(getCartResult);
//   });
// });

// app.post('/getProducts', async (req, res) => {
//   try {
//     const cart = req.body.cart;
//     const getProductsQuery = 'SELECT id, nomProduit, prix, images, Quantité FROM produits WHERE id IN (?)';
//     const productIds = cart.map(item => item.produit_id);

//     const getProductsResult = await new Promise((resolve, reject) => {
//       db.query(getProductsQuery, [productIds], (getProductsErr, getProductsResult) => {
//         if (getProductsErr) {
//           console.error(getProductsErr);
//           reject('Erreur lors de la récupération des détails des produits du panier');
//         }
//         resolve(getProductsResult);
//       });
//     });

//     const cartWithDetails = cart.map(item => {
//       const productDetails = getProductsResult.find(product => product.id === item.produit_id);
//       return {
//         ...item,
//         ...productDetails,
//       };
//     });

//     res.status(200).json(cartWithDetails);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Erreur lors de la récupération des détails des produits du panier');
//   }
// });

// app.post('/removeFromCart', async (req, res) => {
//   const { utilisateur_id, produit_id } = req.body;

//   try {
//     // Effectuez la suppression du produit du panier dans la base de données
//     const removeFromCartQuery = 'DELETE FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
//     await new Promise((resolve, reject) => {
//       db.query(removeFromCartQuery, [utilisateur_id, produit_id], (removeErr, removeResult) => {
//         if (removeErr) {
//           console.error(removeErr);
//           reject('Erreur lors de la suppression du produit du panier');
//         }
//         resolve();
//       });
//     });

//     res.status(200).send('Produit supprimé du panier avec succès !');
//   } catch (error) {
//     console.error('Erreur lors de la suppression du produit du panier:', error);
//     res.status(500).send('Erreur lors de la suppression du produit du panier');
//   }
// });
// // Dans votre fichier serveur
// app.post('/updateCartItemQuantity', async (req, res) => {
//   const { utilisateur_id, produit_id, quantity } = req.body;

//   try {
//     // Vérifiez si le produit existe dans le panier
//     const findCartQuery = 'SELECT id, quantite FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
//     const findCartResult = await new Promise((resolve, reject) => {
//       db.query(findCartQuery, [utilisateur_id, produit_id], (findCartErr, findCartResult) => {
//         if (findCartErr) {
//           console.error(findCartErr);
//           reject('Erreur lors de la recherche du panier de l\'utilisateur');
//         }
//         resolve(findCartResult);
//       });
//     });

//     if (findCartResult.length > 0) {
//       // Mettez à jour la quantité du produit dans le panier
//       const updatedQuantity = findCartResult[0].quantite + quantity;
//       const updateCartQuery = 'UPDATE panier SET quantite = ? WHERE id = ?';
//       await new Promise((resolve, reject) => {
//         db.query(updateCartQuery, [updatedQuantity, findCartResult[0].id], (updateCartErr, updateCartResult) => {
//           if (updateCartErr) {
//             console.error(updateCartErr);
//             reject('Erreur lors de la mise à jour du panier');
//           }
//           resolve();
//         });
//       });

//       res.status(200).send(`Quantité mise à jour avec succès (${updatedQuantity})`);
//     } else {
//       res.status(404).send('Produit non trouvé dans le panier');
//     }
//   } catch (error) {
//     console.error('Erreur lors de la mise à jour de la quantité du produit dans le panier:', error);
//     res.status(500).send('Erreur lors de la mise à jour de la quantité du produit dans le panier');
//   }
// });



// app.get('/user', (req, res) => {
//   const sql = 'SELECT * FROM user';
//   db.query(sql, (err, data) => {
//     if (err) {
//       console.error('Erreur lors de la sélection des utilisateurs :', err);
//       return res.status(500).json(err);
//     }
//     return res.json(data);
//   });
// })

// app.post('/connexion', (req, res) => {
//   const { emailUser, passwordUser } = req.body;
  
//   if (!emailUser || !passwordUser) {
//     return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
//   } else {
//     const sql = 'SELECT * FROM user WHERE email = ?';
//     db.query(sql, [emailUser], async (err, data) => {
//       if (err) {
//         console.error('Erreur lors de la sélection des utilisateurs :', err);
//         return res.status(500).json({ message: 'Erreur serveur' });
//       }

//       if (data.length === 0) {
//         return res.status(401).json({ message: 'Identifiants incorrects' });
//       }

//       const user = data[0];
//       const hashedPassword = user.mdp;

//       const passwordMatch = await bcrypt.compare(passwordUser, hashedPassword);
//       if (!passwordMatch) {
//         return res.status(401).json({ message: 'Identifiants incorrects' });
//       }
      
//       const userData = {
//         id: user.id,
//         nom: user.nom,
//         prenom: user.prenom,
//         role: user.role 
//       };

//       return res.json(userData);
//     });
//   }
// });
// app.post('/user', (req, res) => {
//   const { nom, prenom, email, mdp } = req.body;
//   const sqlUser = 'INSERT INTO user (nom, prenom, email, mdp) VALUES (?, ?, ?, ?)';

//   db.query(sqlUser, [nom, prenom, email, mdp], (errUser, resultUser) => {
//     if (errUser) {
//       console.error('Erreur lors de l\'insertion de l\'utilisateur :', errUser);
//       return res.status(500).json(errUser);
//     }

//     return res.status(200).json({ message: 'Utilisateur enregistré avec succès' });
//   });
// });



// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: fileFilter, 
// });

// app.get('/produits', (req, res) => {
//   const sql = 'SELECT * FROM produits ORDER BY id ASC';
//   db.query(sql, (err, data) => {
//     if (err) {
//       console.error('Erreur lors de la récupération des produits :', err);
//       return res.status(500).json(err);
//     }
//     return res.json(data);
//   });
// });
// app.get('/produits/promo', (req, res) => {
//   const sql = 'SELECT * FROM produits where promo > 0';
//   db.query(sql, (err, data) => {
//     if (err) {
//       console.error('Erreur lors de la récupération des produits :', err);
//       return res.status(500).json(err);
//     }
//     return res.json(data);
//   });
// });
// app.get('/produits/bestSellers', (req, res) => {
//   const sql = 'SELECT * FROM produits WHERE best = "best" ORDER BY id ASC ';
//   db.query(sql, (err, data) => {
//     if (err) {
//       console.error('Erreur lors de la récupération des produits :', err);
//       return res.status(500).json(err);
//     }
//     return res.json(data);
//   });
// });
// app.get('/produits/:categorie/:typeProduit', (req, res) => {
//   const { categorie, typeProduit } = req.params;
//   const sql = 'SELECT * FROM produits WHERE categorie = ? AND cateType = ?';
//   db.query(sql, [categorie, typeProduit], (err, data) => {
//     if (err) {
//       console.error('Erreur lors de la récupération des produits :', err);
//       return res.status(500).json(err);
//     }
//     return res.json(data);
//   });
// });


// app.get('/produits/meme', (req, res) => {
//   const nomProduit = req.query.nomProduit;
//   const sql = `SELECT * FROM produits WHERE  nomProduit = ?`;
//   db.query(sql, [nomProduit], (err, data) => {
//     if (err) {
//       console.error('Error executing SQL query:', err);
//       return res.status(500).json(err);
//     }

//     console.log('Query result:', data);
//     return res.json(data);
//   });
// });

// app.get('/produits/:categorie', (req, res) => {
//   const categorie = req.params.categorie;
//   const sql = 'SELECT * FROM produits WHERE categorie = ?';
//   db.query(sql, [categorie], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.json(data);
//   });
// });

// app.get('/produits/:id', (req, res) => {
//   const productId = req.params.id;
//   const sql = 'SELECT * FROM produits WHERE id = ?';
//   db.query(sql, [productId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.json(data);
//   });
// });

// app.get('/newcollection', (req, res) => {
//   const sql = 'SELECT * FROM produits WHERE nomProduit = "Under Armour Haut Zippé Tech Homme"';
//   db.query(sql, (err, data) => {
//     if (err) {
//       console.error('Erreur lors de la récupération des produits :', err);
//       return res.status(500).json(err);
//     }
//     return res.json(data);
//   });
// });

// app.post('/produits', upload.array('images', 5), (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: 'No files uploaded.' });
//     }

//     const { nomProduit, description, categorie, couleur, taille, promo, cateType , prix } = req.body;
//     const imagePaths = req.files.map((file) => file.filename).join(',');

//     const sql = 'INSERT INTO produits (nomProduit, images, description, categorie, couleur, taille, promo, cateType , prix) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
//     db.query(sql, [nomProduit, imagePaths, description, categorie, couleur, taille, promo, cateType, prix], (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Erreur lors de l\'insertion ');
//       } else {
//         console.log(result);
//         res.status(200).send('Article ajouté avec succès !');
//       }
//     });
//   } catch (error) {
//     console.error('Error handling file upload:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.delete('/produits/:id', (req, res) => {
//   const productId = req.params.id;

//   const sql = 'DELETE FROM produits WHERE id = ?';
//   db.query(sql, [productId], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Erreur lors de la suppression du produit.');
//     } else {
//       console.log(result);
//       res.status(200).send('Produit supprimé avec succès !');
//     }
//   });
// });

// app.put('/produits/:id', upload.array('images', 5), (req, res) => {
//   const productId = req.params.id;
//   const { nomProduit, description, categorie, couleur, taille, promo, cateType, prix } = req.body;
//   let newImagePaths = [];
//   if (req.files && req.files.length > 0) {
//     newImagePaths = req.files.map((file) => file.filename);
//   }
//   const updateInfoSql = 'UPDATE produits SET nomProduit=?, description=?, categorie=?, couleur=?, taille=?, promo=?, cateType=?, prix=? WHERE id=?';
//   const updateInfoParams = [nomProduit, description, categorie, couleur, taille, promo, cateType, prix, productId];

//   db.query(updateInfoSql, updateInfoParams, (infoErr, infoResult) => {
//     if (infoErr) {
//       console.error(infoErr);
//       res.status(500).send('Erreur lors de la mise à jour du produit.');
//     } else {
//       if (newImagePaths.length > 0) {
//         const updateImagesSql = 'UPDATE produits SET images=? WHERE id=?';
//         const updatedImagePaths = [...newImagePaths]; 

//         db.query(updateImagesSql, [updatedImagePaths.join(','), productId], (imageErr, imageResult) => {
//           if (imageErr) {
//             console.error(imageErr);
//             res.status(500).send('Erreur lors de la mise à jour des images du produit.');
//           } else {
//             console.log(imageResult);
//             res.status(200).send('Produit et images mis à jour avec succès !');
//           }
//         });
//       } else {
//         console.log(infoResult);
//         res.status(200).send('Produit mis à jour avec succès !');
//       }
//     }
//   });
// });





// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });












// const express = require('express');
// const app = express();
// const port = 3001;
// const db = require('../dbb/connexion');
// const cors = require('cors');
// const multer = require('multer');
// const productRouter = express.Router();



// app.use(express.json());
// app.use(cors());

// app.use('/uploads', express.static('../../sport/uploads'));


// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, '../../sport/uploads');

//   },

//   filename: (req, file, callback) => {
//     callback(null, `image-${Date.now()}-${file.originalname}`);
//   },
// });
// const fileFilter = (req, file, callback) => {
//   if (file.mimetype.startsWith('image/')) {
//     callback(null, true);
//   } else {
//     callback(new Error('upload une image.'), false);
//   }
// };
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter, 
//   });



// productRouter.post('/addToCart', async (req, res) => {
//   const { utilisateur_id, produit_id } = req.body;
//   const getProductPriceQuery = 'SELECT prix FROM produits WHERE id = ?';
//   db.query(getProductPriceQuery, [produit_id], (getPriceErr, getPriceResult) => {
//     if (getPriceErr) {
//       console.error(getPriceErr);
//       return res.status(500).send('Erreur lors de la récupération du prix du produit');
//     }

//     const produit_prix = getPriceResult[0].prix;

//     const findCartQuery = 'SELECT id, quantite, prix FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
//     db.query(findCartQuery, [utilisateur_id, produit_id], (findCartErr, findCartResult) => {
//       if (findCartErr) {
//         console.error(findCartErr);
//         return res.status(500).send('Erreur lors de la recherche du panier de l\'utilisateur');
//       }

//       if (findCartResult.length > 0) {
//         const updatedQuantity = findCartResult[0].quantite + 1;
//         const updatedTotalPrice = findCartResult[0].prix + produit_prix;
//         const updateCartQuery = 'UPDATE panier SET quantite = ?, prix = ? WHERE id = ?';
//         db.query(updateCartQuery, [updatedQuantity, updatedTotalPrice, findCartResult[0].id], (updateCartErr, updateCartResult) => {
//           if (updateCartErr) {
//             console.error(updateCartErr);
//             return res.status(500).send('Erreur lors de la mise à jour du panier');
//           }

//           console.log('Produit ajouté au panier avec succès !');
//           res.status(200).send('Produit ajouté au panier avec succès !');
//         });
//       } else {
//         const addToCartQuery = 'INSERT INTO panier (utilisateur_id, produit_id, quantite, prix) VALUES (?, ?, 1, ?)';
//         db.query(addToCartQuery, [utilisateur_id, produit_id, produit_prix], (addToCartErr, addToCartResult) => {
//           if (addToCartErr) {
//             console.error(addToCartErr);
//             return res.status(500).send('Erreur lors de l\'ajout du produit au panier');
//           }
//           console.log('Produit ajouté au panier avec succès !');
//           res.status(200).send('Produit ajouté au panier avec succès !');
//         });
//       }
//     });
//   });
// });
// productRouter.get('/getCart', (req, res) => {
//   const utilisateur_id = req.query.utilisateur_id;

//   const getCartQuery = 'SELECT id, produit_id, quantite FROM panier WHERE utilisateur_id = ?';
//   db.query(getCartQuery, [utilisateur_id], (getCartErr, getCartResult) => {
//     if (getCartErr) {
//       console.error(getCartErr);
//       return res.status(500).send('Erreur lors de la récupération du panier de l\'utilisateur');
//     }

//     res.status(200).json(getCartResult);
//   });
// });

// productRouter.post('/getProducts', async (req, res) => {
//   try {
//     const cart = req.body.cart;
//     const getProductsQuery = 'SELECT id, nomProduit, prix, images, Quantité FROM produits WHERE id IN (?)';
//     const productIds = cart.map(item => item.produit_id);

//     const getProductsResult = await new Promise((resolve, reject) => {
//       db.query(getProductsQuery, [productIds], (getProductsErr, getProductsResult) => {
//         if (getProductsErr) {
//           console.error(getProductsErr);
//           reject('Erreur lors de la récupération des détails des produits du panier');
//         }
//         resolve(getProductsResult);
//       });
//     });

//     const cartWithDetails = cart.map(item => {
//       const productDetails = getProductsResult.find(product => product.id === item.produit_id);
//       return {
//         ...item,
//         ...productDetails,
//       };
//     });

//     res.status(200).json(cartWithDetails);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Erreur lors de la récupération des détails des produits du panier');
//   }
// });

// productRouter.post('/removeFromCart', async (req, res) => {
//   const { utilisateur_id, produit_id } = req.body;

//   try {
//     // Effectuez la suppression du produit du panier dans la base de données
//     const removeFromCartQuery = 'DELETE FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
//     await new Promise((resolve, reject) => {
//       db.query(removeFromCartQuery, [utilisateur_id, produit_id], (removeErr, removeResult) => {
//         if (removeErr) {
//           console.error(removeErr);
//           reject('Erreur lors de la suppression du produit du panier');
//         }
//         resolve();
//       });
//     });

//     res.status(200).send('Produit supprimé du panier avec succès !');
//   } catch (error) {
//     console.error('Erreur lors de la suppression du produit du panier:', error);
//     res.status(500).send('Erreur lors de la suppression du produit du panier');
//   }
// });

// productRouter.post('/updateCartItemQuantity', async (req, res) => {
//   const { utilisateur_id, produit_id, quantity } = req.body;

//   try {
//     // Vérifiez si le produit existe dans le panier
//     const findCartQuery = 'SELECT id, quantite FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
//     const findCartResult = await new Promise((resolve, reject) => {
//       db.query(findCartQuery, [utilisateur_id, produit_id], (findCartErr, findCartResult) => {
//         if (findCartErr) {
//           console.error(findCartErr);
//           reject('Erreur lors de la recherche du panier de l\'utilisateur');
//         }
//         resolve(findCartResult);
//       });
//     });

//     if (findCartResult.length > 0) {
//       // Mettez à jour la quantité du produit dans le panier
//       const updatedQuantity = findCartResult[0].quantite + quantity;
//       const updateCartQuery = 'UPDATE panier SET quantite = ? WHERE id = ?';
//       await new Promise((resolve, reject) => {
//         db.query(updateCartQuery, [updatedQuantity, findCartResult[0].id], (updateCartErr, updateCartResult) => {
//           if (updateCartErr) {
//             console.error(updateCartErr);
//             reject('Erreur lors de la mise à jour du panier');
//           }
//           resolve();
//         });
//       });

//       res.status(200).send(`Quantité mise à jour avec succès (${updatedQuantity})`);
//     } else {
//       res.status(404).send('Produit non trouvé dans le panier');
//     }
//   } catch (error) {
//     console.error('Erreur lors de la mise à jour de la quantité du produit dans le panier:', error);
//     res.status(500).send('Erreur lors de la mise à jour de la quantité du produit dans le panier');
//   }
// });

// productRouter.get('/produits', (req, res) => {
//     const sql = 'SELECT * FROM produits ORDER BY id ASC';
//     db.query(sql, (err, data) => {
//       if (err) {
//         console.error('Erreur lors de la récupération des produits :', err);
//         return res.status(500).json(err);
//       }
//       return res.json(data);
//     });
//   });
// productRouter.get('/produits/promo', (req, res) => {
//     const sql = 'SELECT * FROM produits where promo > 0';
//     db.query(sql, (err, data) => {
//       if (err) {
//         console.error('Erreur lors de la récupération des produits :', err);
//         return res.status(500).json(err);
//       }
//       return res.json(data);
//     });
//   });
// productRouter.get('/produits/bestSellers', (req, res) => {
//     const sql = 'SELECT * FROM produits WHERE best = "best" ORDER BY id ASC ';
//     db.query(sql, (err, data) => {
//       if (err) {
//         console.error('Erreur lors de la récupération des produits :', err);
//         return res.status(500).json(err);
//       }
//       return res.json(data);
//     });
//   });
// productRouter.get('/produits/:categorie/:typeProduit', (req, res) => {
//     const { categorie, typeProduit } = req.params;
//     const sql = 'SELECT * FROM produits WHERE categorie = ? AND cateType = ?';
//     db.query(sql, [categorie, typeProduit], (err, data) => {
//       if (err) {
//         console.error('Erreur lors de la récupération des produits :', err);
//         return res.status(500).json(err);
//       }
//       return res.json(data);
//     });
//   });
  
  
// productRouter.get('/produits/meme', (req, res) => {
//     const nomProduit = req.query.nomProduit;
//     const sql = `SELECT * FROM produits WHERE  nomProduit = ?`;
//     db.query(sql, [nomProduit], (err, data) => {
//       if (err) {
//         console.error('Error executing SQL query:', err);
//         return res.status(500).json(err);
//       }
  
//       console.log('Query result:', data);
//       return res.json(data);
//     });
//   });
  
// productRouter.get('/produits/:categorie', (req, res) => {
//     const categorie = req.params.categorie;
//     const sql = 'SELECT * FROM produits WHERE categorie = ?';
//     db.query(sql, [categorie], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.json(data);
//     });
//   });
  
// productRouter.get('/produits/:id', (req, res) => {
//     const productId = req.params.id;
//     const sql = 'SELECT * FROM produits WHERE id = ?';
//     db.query(sql, [productId], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.json(data);
//     });
//   });
  
// productRouter.get('/newcollection', (req, res) => {
//     const sql = 'SELECT * FROM produits WHERE nomProduit = "Under Armour Haut Zippé Tech Homme"';
//     db.query(sql, (err, data) => {
//       if (err) {
//         console.error('Erreur lors de la récupération des produits :', err);
//         return res.status(500).json(err);
//       }
//       return res.json(data);
//     });
//   });
  
// productRouter.post('/produits', upload.array('images', 5), (req, res) => {
//     try {
//       if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ error: 'No files uploaded.' });
//       }
  
//       const { nomProduit, description, categorie, couleur, taille, promo, cateType , prix } = req.body;
//       const imagePaths = req.files.map((file) => file.filename).join(',');
  
//       const sql = 'INSERT INTO produits (nomProduit, images, description, categorie, couleur, taille, promo, cateType , prix) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
//       db.query(sql, [nomProduit, imagePaths, description, categorie, couleur, taille, promo, cateType, prix], (err, result) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send('Erreur lors de l\'insertion ');
//         } else {
//           console.log(result);
//           res.status(200).send('Article ajouté avec succès !');
//         }
//       });
//     } catch (error) {
//       console.error('Error handling file upload:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  
// productRouter.delete('/produits/:id', (req, res) => {
//     const productId = req.params.id;
  
//     const sql = 'DELETE FROM produits WHERE id = ?';
//     db.query(sql, [productId], (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Erreur lors de la suppression du produit.');
//       } else {
//         console.log(result);
//         res.status(200).send('Produit supprimé avec succès !');
//       }
//     });
//   });
  
// productRouter.put('/produits/:id', upload.array('images', 5), (req, res) => {
//     const productId = req.params.id;
//     const { nomProduit, description, categorie, couleur, taille, promo, cateType, prix } = req.body;
//     let newImagePaths = [];
//     if (req.files && req.files.length > 0) {
//       newImagePaths = req.files.map((file) => file.filename);
//     }
//     const updateInfoSql = 'UPDATE produits SET nomProduit=?, description=?, categorie=?, couleur=?, taille=?, promo=?, cateType=?, prix=? WHERE id=?';
//     const updateInfoParams = [nomProduit, description, categorie, couleur, taille, promo, cateType, prix, productId];
  
//     db.query(updateInfoSql, updateInfoParams, (infoErr, infoResult) => {
//       if (infoErr) {
//         console.error(infoErr);
//         res.status(500).send('Erreur lors de la mise à jour du produit.');
//       } else {
//         if (newImagePaths.length > 0) {
//           const updateImagesSql = 'UPDATE produits SET images=? WHERE id=?';
//           const updatedImagePaths = [...newImagePaths]; 
  
//           db.query(updateImagesSql, [updatedImagePaths.join(','), productId], (imageErr, imageResult) => {
//             if (imageErr) {
//               console.error(imageErr);
//               res.status(500).send('Erreur lors de la mise à jour des images du produit.');
//             } else {
//               console.log(imageResult);
//               res.status(200).send('Produit et images mis à jour avec succès !');
//             }
//           });
//         } else {
//           console.log(infoResult);
//           res.status(200).send('Produit mis à jour avec succès !');
//         }
//       }
//     });
//   });
  
//   app.use('/', productRouter);
//   module.exports = function() {
//     return productRouter;
//   };
  



// import "../css/Admin.css";
// import add from '../Assets/icons/add.png';
// import { useState, useEffect } from 'react';
// import close from '../Assets/icons/close.png';
// import axios from 'axios';
// import sup from "../Assets/icons/icons8-poubelle-52.png"
// import modif from "../Assets/icons/icons8-modifier-64.png"
// import utilisateur from "../Assets/icons/icons8-utilisateur-50.png"
// import produit from "../Assets/icons/icons8-produit-50.png"
// import commande from "../Assets/icons/icons8-ordre-d'achat-50.png"
// export const Admin = () => {
//   const localhost = "http://192.168.1.33:3001";
//   const [nomProduit, setNomProduit] = useState('');
//   const [description, setDescription] = useState('');
//   const [couleur, setCouleur] = useState('');
//   const [taille, setTaille] = useState('');
//   const [prix, setPrix] = useState('');
//   const [promo, setPromo] = useState('');
//   const [categorie, setCategorie] = useState('');
//   const [cateType, setCateType] = useState('');
//   const [images, setImages] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [overlayVisible, setOverlayVisible] = useState(false);
//   const [produits, setProduits] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedMenuItem, setSelectedMenuItem] = useState('produit');

//   const handleMenuClick = (menuItem) => {
//     setSelectedMenuItem(menuItem);
//   };
//   const produitsAPI = "http://192.168.1.33:3001/api/products";
//   const usersAPI = "http://192.168.1.33:3001/api/users";

//   useEffect(() => {
//     axios.get(produitsAPI)
//     .then((res) => {
//       setProduits(res.data);
//     })
//     .catch((error) => {
//       console.error('Erreur lors de la récupération des données de l\'API des produits :', error);
//     });

//   axios.get(usersAPI)
//     .then((res) => {
//       setUsers(res.data);
//     })
//     .catch((error) => {
//       console.error('Erreur lors de la récupération des données de l\'API des utilisateurs :', error);
//     });
//   }, []);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('nomProduit', nomProduit);
//       formData.append('description', description);
//       formData.append('prix', prix);
//       formData.append('categorie', categorie);
//       formData.append('promo', promo);
//       formData.append('cateType', cateType);
//       formData.append('couleur', couleur);
//       formData.append('taille', taille);


//       if (images.length > 0) {
//         images.forEach((image) => {
//           formData.append('images', image);
//         });
//       }


//       await axios.post(produitsAPI, formData);
//       setOverlayVisible(false);
//       window.location.reload()
//     } catch (error) {
//       console.error('Error :', error);
//     }
//   };

//   const handleDelete = async (productId) => {
//     try {
//       await axios.delete(`${produitsAPI}/${productId}`);
//       setProduits((prevProducts) => prevProducts.filter((product) => product.id !== productId));
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };


//   const handleEdit = (productId) => {
//     const productToEdit = produits.find((product) => product.id === productId);
//     console.log('Produit à éditer :', productToEdit);
  
//     setNomProduit(productToEdit.nomProduit || '');
//     setDescription(productToEdit.description || '');
//     setPrix(productToEdit.prix || '');
//     setCategorie(productToEdit.categorie || '');
//     setPromo(productToEdit.promo || '');
//     setCateType(productToEdit.cateType || '');
//     setCouleur(productToEdit.couleur || '');
//     setTaille(productToEdit.taille || '');
  
//     setEditingProduct(productToEdit);
//     setOverlayVisible(true);
//   };
  
//   const handleUpdate = async (e) => {
//     e.preventDefault();
  
//     try {
//       console.log('Valeurs d\'état avant la mise à jour :', { nomProduit, description, prix, categorie, promo, cateType, couleur, taille });
  
//       const formData = new FormData();
//       console.log(typeof formData)
//       formData.append('nomProduit', nomProduit);
//       formData.append('description', description);
//       formData.append('prix', prix);
//       formData.append('categorie', categorie);
//       formData.append('promo', promo);
//       formData.append('cateType', cateType);
//       formData.append('couleur', couleur);
//       formData.append('taille', taille);
  
//       if (images.length > 0) {
//         images.forEach((image) => {
//           formData.append('images', image);
//         });
//       }
  
//       console.log('Données envoyées pour la mise à jour :', formData);
  
//       const response = await axios.put(`${produitsAPI}/${editingProduct.id}`, formData);
//       console.log('Réponse du serveur après la mise à jour :', response.data); 
  
//       setProduits((prevProducts) =>
//           prevProducts.map((product) =>
//               product.id === editingProduct.id
//                   ? { ...product, nomProduit, description, prix, categorie, couleur, taille, promo, cateType }
//                   : product
//           )
//       );
      
//       console.log('Valeurs d\'état après la mise à jour :', { nomProduit, description, prix, categorie, promo, cateType, couleur, taille });
      
//       setOverlayVisible(false);
//       setEditingProduct(null);
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du produit :', error);
      
//     }
//   };
  
  

//   return (
//     <div className="wrap-Admin">
//       <div className='Admin'>
//         <div className="sidebar">
//           <div>
//             <div className="logo"></div>
//             <ul>
//             <li onClick={() => handleMenuClick('produit')}><img src={produit} alt="" /> Produit</li>
//               <li onClick={() => handleMenuClick('utilisateur')}> <img src={utilisateur} alt="" /> Utilisateur</li>
//               <li onClick={() => handleMenuClick('commande')}> <img src={commande} alt="" /> Commande</li>
//             </ul>
//           </div>
//         </div>
//         <div className="lesproduits">
//         {selectedMenuItem === 'produit' && (
//             <div className="table">
//             <div className="table-header">
//               <div className="header__item"><a id="name" className="filter__link" href="#">Id</a></div>
//               <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">image</a></div>
//               <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">nom</a></div>
//               <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Promo</a></div>
//               <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">prix</a></div>
//               <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Quantité </a></div>
//               <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#"></a></div>
//             </div>
//             <div className="table-content">
//               {produits.map((unproduit, index) => (
//                 <div className="table-row" key={index}>
//                   <div className="table-data">#{unproduit.id}</div>
//                   <div className="table-data">
//                   {unproduit.images && unproduit.images.length > 0 ? (
//                      <img src={`${localhost}/uploads/${unproduit.images.split(',')[0]}`} alt="" />
//                   ) : (
//                     <img src={`${localhost}/uploads/default-image.jpg`} alt="Default" />
//                   )}
//                   </div>
//                   <div className="table-data">{unproduit.nomProduit}</div>
//                   <div className="table-data">{unproduit.promo}</div>
//                   <div className="table-data">{unproduit.prix}.00 €</div>
//                   <div className="table-data">{unproduit.Quantité}</div>
//                   <div className="table-data">
//                     <button onClick={() => handleEdit(unproduit.id)}><img src={modif} alt="" /></button>
//                     <button onClick={() => handleDelete(unproduit.id)}><img src={sup} alt="" /></button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           )}
//           {selectedMenuItem === 'utilisateur' && (
//             <div className="table_utilisateur">
//               <ul>
//                 {users.map((user, index) => (
//                   <li key={index}>
//                     <div className="admin_utilisateur">
//                       <div className="adminLeft_utilisateur">
//                       <div> <p> {user.nom && user.nom.charAt(0)}</p>.<p>{user.prenom && user.prenom.charAt(0)}</p></div>
//                       </div>
//                       <div className="adminRight_utilisateur">
//                         <h4>{user.nom} {user.prenom}</h4>
//                         <p>{user.email}</p>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           {selectedMenuItem === 'commande' && (
//             <div className="table">
//               <h1>Commande</h1>
//             </div>
//           )}
          
//         </div>
//       </div>
//       <div className="add-button" onClick={() => setOverlayVisible(true)}>
//         <img src={add} alt="" />
//       </div>
//       <div>
//         {overlayVisible && (
//           <div className="wrap-Overlay-add">
//             <div className="Overlay-add">
//               <h1>{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</h1>
//               <form onSubmit={editingProduct ? handleUpdate : handleSubmit}>
//                 <div className="flex-form">
//                   <div>
//                     <label htmlFor="nomProduit">Nom</label>
//                     <input
//                       type="text"
//                       value={nomProduit}
//                       onChange={(e) => setNomProduit(e.target.value)}
//                     />
//                     <label htmlFor="description">Description</label>
//                     <input
//                       type="text"
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                     />
//                     <label htmlFor="prix">Prix</label>
//                     <input
//                       type="text"
//                       value={prix}
//                       onChange={(e) => setPrix(e.target.value)}
//                     />
//                     <label htmlFor="categorie">Catégorie</label>
//                     <input
//                       type="text"
//                       value={categorie}
//                       onChange={(e) => setCategorie(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="promo">Promo</label>
//                     <input
//                       type="text"
//                       value={promo}
//                       onChange={(e) => setPromo(e.target.value)}
//                     />
//                     <label htmlFor="cateType">CatégorieType</label>
//                     <input
//                       type="text"
//                       value={cateType}
//                       onChange={(e) => setCateType(e.target.value)}
//                     />
//                     <label htmlFor="couleur">Couleur</label>
//                     <input
//                       type="text"
//                       value={couleur}
//                       onChange={(e) => setCouleur(e.target.value)}
//                     />
//                     <label htmlFor="images">Images</label>
//                     <input type="file" id="images" onChange={(e) => setImages([...e.target.files])} multiple />
//                     <label htmlFor="taille">Taille</label>
//                     <input
//                       type="text"
//                       value={taille}
//                       onChange={(e) => setTaille(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div className="center-submit">
//                   <input type="submit" value="Submit" />
//                 </div>
//               </form>
//               <div className="close-me">
//                 <button onClick={() => setOverlayVisible(false)}><img src={close} alt="" /></button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };