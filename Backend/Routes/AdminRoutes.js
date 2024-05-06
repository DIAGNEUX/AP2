const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/AdminController');
const cookieParser = require('cookie-parser');
const app = express();


app.use(cookieParser());


router.get('/products',  AdminController.getAllProducts);
router.get('/users', AdminController.getUsers);


module.exports = router;
