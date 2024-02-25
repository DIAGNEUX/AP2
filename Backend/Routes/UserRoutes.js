const express = require('express');
const userController = require('../Controllers/UserController');
const userRouter = express.Router();
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors()); 

// Route pour récupérer tous les utilisateurs
userRouter.get('/', userController.getUsers);


userRouter.post('/login', userController.loginUser);


userRouter.post('/createuser', userController.createUser);

module.exports = userRouter;
