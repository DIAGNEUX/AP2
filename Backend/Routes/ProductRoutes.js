const express = require('express');
const router = express.Router();
const productController = require('../Controllers/ProductController');
const isAdmin = require('../Middleware/middleware');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
 



// router.get('/', isAdmin ,productController.getAllProducts);
router.get('/promo', productController.getPromoProducts);
router.get('/best-sellers', productController.getBestSellingProducts);
router.get('/:id', productController.getProductById);
// router.post('/',productController.createProduct);
// router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProductById);
router.get('/category/:categorie', productController.getProductsByCategory);
router.get('/category/:categorie/:typeProduit', productController.getProductsByCategoryAndType);
router.get('/same/:nomProduit', productController.getProductBysame);
router.get('/new-collection', productController.getNewCollection); 

// Autres routes pour le panier, etc.
// router.post('/cart', productController.addToCart);
// // router.get('/cart', productController.getCart);
// router.delete('/cart/:utilisateur_id/:produit_id', productController.removeFromCart);
// router.put('/cart/update-quantity', productController.updateCartItemQuantity);

module.exports = router;
