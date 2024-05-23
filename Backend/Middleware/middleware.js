// const express = require('express');
// const cookieParser = require('cookie-parser');
// const app = express();

// app.use(cookieParser());

// const isAdmin = (req, res, next) => {
//     const userRole = req.cookies.userRole;
//     const userNom = req.cookies.userNom; 
  
//     console.log("ce que tu récupères", "role: " + userRole, "nom: " + userNom);
//     const isAdminRoutes = ['/api/admin/products', '/api/admin/users']; 
    
//     if (userRole !== '1') {
//         // if (isAdminRoutes.includes(req.path)) {
//         //     return res.status(401).json({ message: 'not authorized' });
//         // }
//         return next();
//     } else {
//         return next();
//     }
// };

// module.exports = isAdmin;
