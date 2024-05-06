const express = require('express');
const userController = require('../Controllers/UserController');
const cookieParser = require('cookie-parser');
const isAdmin = require('../Middleware/middleware');
const userRouter = express.Router();
const app = express();
const cors = require('cors');


app.use(cookieParser());
app.use(express.json());
app.use(cors()); 



// userRouter.get('/', isAdmin, userController.getUsers);


userRouter.post('/login', userController.loginUser);


userRouter.post('/createuser', userController.createUser);

module.exports = userRouter;
