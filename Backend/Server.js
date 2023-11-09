const express = require('express');
const app = express();
const port = 3001;
app.use(express.json())
const db = require('./dbb/connexion')
const cors = require('cors')
app.use(cors())


app.get("/produits", (req, res) => {
    const sql = "SELECT * FROM questions";
    db.query(sql, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
  app.post("/produits", (req, res) => {
    const { theme, question, reponse } = req.body;
    const sql = "INSERT INTO questions (theme, question, reponse) VALUES (?, ?, ?)";
    db.query(sql, [theme, question, reponse], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Erreur", error: err });
      }
      res.status(200).json({ message: "Question ajoutée ", data: result });
    });
});

// app.put("/quiz/:id", (req, res) => {
//     const { id } = req.params;
//     const { theme, question, reponse } = req.body;
//     const sql = "UPDATE questions SET theme = ?, question = ?, reponse = ? WHERE id = ?";
  
//     db.query(sql, [theme, question, reponse, id], (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: "Erreur ", error: err });
//       }
//       res.status(200).json({ message: "Question modifiée " });
//     });
// }); 
  
  
  
  
  
  

// app.delete("/quiz/:id", (req, res) => {
//     const { id } = req.params; 
//     const sql = "DELETE FROM questions WHERE id = ?";   
//     db.query(sql, [id], (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: "Erreur lors de la suppression de la question", error: err });
//       }
//       res.status(200).json({ message: "Question supprimée ", data: result });
//     });
//   });
  
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
