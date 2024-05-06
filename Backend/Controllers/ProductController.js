const db = require('../dbb/connexion');



// exports.getAllProducts =  (req, res) => {
//     const sql = 'SELECT * FROM produits ORDER BY id ASC';
//     db.query(sql, (err, data) => {
//       if (err) {
//         console.error('Erreur lors de la récupération des produits :', err);
//         return res.status(500).json(err);
//       }
//       return res.json(data);
//     });
// };

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
