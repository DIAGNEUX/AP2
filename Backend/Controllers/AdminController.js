const db = require('../dbb/connexion');

exports.getAllProducts =  (req, res) => {
    const sql = 'SELECT * FROM produits ORDER BY id ASC';
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
};
exports.getUsers = (req, res) => {
  const sql = 'SELECT nom, prenom, email FROM user';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Erreur lors de la sélection des utilisateurs :', err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};
