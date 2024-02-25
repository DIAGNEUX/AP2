const db = require('../dbb/connexion');


exports.getAllProducts = (req, res) => {
    const sql = 'SELECT * FROM produits ORDER BY id ASC';
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
};

exports.getPromoProducts = (req, res) => {
    const sql = 'SELECT * FROM produits where promo > 0';
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
};

exports.getBestSellingProducts = (req, res) => {
    const sql = 'SELECT * FROM produits WHERE best = "best" ORDER BY id ASC ';
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
};

exports.getProductsByCategoryAndType = (req, res) => {
    const { categorie, typeProduit } = req.params;
    const sql = 'SELECT * FROM produits WHERE categorie = ? AND cateType = ?';
    db.query(sql, [categorie, typeProduit], (err, data) => {
      if (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
};

exports.getProductBysame = (req, res) => { 
  const nomProduit = req.params.nomProduit;
  const sql = `SELECT * FROM produits WHERE  nomProduit = ?`;
  db.query(sql, [nomProduit], (err, data) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json(err);
    }

    console.log('Query result:', data);
    return res.json(data);
  });
};


exports.getProductsByCategory = (req, res) => {
    const categorie = req.params.categorie;
    const sql = 'SELECT * FROM produits WHERE categorie = ?';
    db.query(sql, [categorie], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
};

exports.getProductById = (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM produits WHERE id = ?';
    db.query(sql, [productId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
};

// ProductController.js
exports.getNewCollection = (req, res) => {
  const nomProduit = "Under Armour Haut Zippé Tech Homme";
  const sql = 'SELECT * FROM produits WHERE nomProduit = ?';
  db.query(sql, [nomProduit], (err, data) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits de la nouvelle collection :', err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};



// Définition de la fonction createProduct dans ProductController.js
// exports.createProduct = async (req, res) => {
//     try {
//       // Extraire les données du corps de la requête
//       const { nomProduit, description, categorie, couleur, taille, promo, cateType, prix } = req.body;
      
//       // Effectuer la logique de création du produit dans la base de données
//       const sql = 'INSERT INTO produits (nomProduit, images, description, categorie, couleur, taille, promo, cateType, prix) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
//       console.error('Erreur lors de la création du produit:', error);
//       res.status(500).send('Erreur lors de la création du produit');
//     }
//   };
  

exports.deleteProductById = async (req, res) => {
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
};

exports.updateProduct = async (req, res) => {
    try {
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
    } catch (error) {
      console.error('Erreur lors de la modification du produit:', error);
      res.status(500).send('Erreur lors de la modification du produit');
    }
  };
