const express = require('express');
const panierRouter = express.Router();
const productController = require('../Controllers/PanierController');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

panierRouter.post('/', productController.addToCart);
// panierRouter.delete('/:utilisateur_id/:produit_id', productController.removeFromCart);
// panierRouter.put('/updateCartItemQuantity', productController.updateCartItemQuantity);

module.exports = panierRouter;