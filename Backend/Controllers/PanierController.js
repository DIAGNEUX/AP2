const db = require('../dbb/connexion');


exports.addToCart = async (req, res) => {
    const { utilisateur_id, produit_id } = req.body;
    const getProductPriceQuery = 'SELECT prix FROM produits WHERE id = ?';
    db.query(getProductPriceQuery, [produit_id], (getPriceErr, getPriceResult) => {
      if (getPriceErr) {
        console.error(getPriceErr);
        return res.status(500).send('Erreur lors de la récupération du prix du produit');
      }
  
      const produit_prix = getPriceResult[0].prix;
  
      const findCartQuery = 'SELECT id, quantite, prix FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
      db.query(findCartQuery, [utilisateur_id, produit_id], (findCartErr, findCartResult) => {
        if (findCartErr) {
          console.error(findCartErr);
          return res.status(500).send('Erreur lors de la recherche du panier de l\'utilisateur');
        }
  
        if (findCartResult.length > 0) {
          const updatedQuantity = findCartResult[0].quantite + 1;
          const updatedTotalPrice = findCartResult[0].prix + produit_prix;
          const updateCartQuery = 'UPDATE panier SET quantite = ?, prix = ? WHERE id = ?';
          db.query(updateCartQuery, [updatedQuantity, updatedTotalPrice, findCartResult[0].id], (updateCartErr, updateCartResult) => {
            if (updateCartErr) {
              console.error(updateCartErr);
              return res.status(500).send('Erreur lors de la mise à jour du panier');
            }
  
            console.log('Produit ajouté au panier avec succès !');
            res.status(200).send('Produit ajouté au panier avec succès !');
          });
        } else {
          const addToCartQuery = 'INSERT INTO panier (utilisateur_id, produit_id, quantite, prix) VALUES (?, ?, 1, ?)';
          db.query(addToCartQuery, [utilisateur_id, produit_id, produit_prix], (addToCartErr, addToCartResult) => {
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
  };


// exports.getCart = (req, res) => {
//     const utilisateur_id = req.query.utilisateur_id;

//     const getCartQuery = 'SELECT id, produit_id, quantite FROM panier WHERE utilisateur_id = ?';
//     db.query(getCartQuery, [utilisateur_id], (getCartErr, getCartResult) => {
//       if (getCartErr) {
//         console.error(getCartErr);
//         return res.status(500).send('Erreur lors de la récupération du panier de l\'utilisateur');
//       }
  
//       res.status(200).json(getCartResult);
//     });
// };

// exports.getProducts = async (req, res) => {
//      try {
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
// };


// exports.removeFromCart = async (req, res) => {
//     const { utilisateur_id, produit_id } = req.body;
//     try {
//       const removeFromCartQuery = 'DELETE FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
//       await new Promise((resolve, reject) => {
//         db.query(removeFromCartQuery, [utilisateur_id, produit_id], (removeErr, removeResult) => {
//           if (removeErr) {
//             console.error(removeErr);
//             reject('Erreur lors de la suppression du produit du panier');
//           }
//           resolve();
//         });
//       });
  
//       res.status(200).send('Produit supprimé du panier avec succès !');
//     } catch (error) {
//       console.error('Erreur lors de la suppression du produit du panier:', error);
//       res.status(500).send('Erreur lors de la suppression du produit du panier');
//     }
// };

// exports.updateCartItemQuantity = async (req, res) => {
//     const { utilisateur_id, produit_id, quantity } = req.body;

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
// }
