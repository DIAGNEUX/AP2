const express = require('express');
const app = express();
const port = 3001;
const db = require('./dbb/connexion');
const cors = require('cors');
const multer = require('multer');

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

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter, 
});

app.get('/produits', (req, res) => {
  const sql = 'SELECT * FROM produits';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});
app.get('/produits/homme', (req, res) => {
  const sql = 'SELECT * FROM produits WHERE categorie = "Homme"';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
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
app.get('/produits/femme', (req, res) => {
  const sql = 'SELECT * FROM produits WHERE categorie = "Femme"';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});
app.get('/produits/enfant', (req, res) => {
  const sql = 'SELECT * FROM produits WHERE categorie = "Enfant"';
  db.query(sql, (err, data) => {
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


app.put('/produits/:id', (req, res) => {
  const productId = req.params.id;
  const { nomProduit, description, categorie, couleur, taille, promo, cateType, prix } = req.body;

  const sql = 'UPDATE produits SET nomProduit=?, description=?, categorie=?, couleur=?, taille=?, promo=?, cateType=?, prix=? WHERE id=?';
  db.query(sql, [nomProduit, description, categorie, couleur, taille, promo, cateType, prix, productId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la mise à jour du produit.');
    } else {
      console.log(result);
      res.status(200).send('Produit mis à jour avec succès !');
    }
  });
});





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


