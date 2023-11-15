// if (group.current) {
//     group.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
//   }

//   const directionalLight = new DirectionalLight(0xffffff, 0.5); // Couleur blanche, intensité 0.5
//   directionalLight.position.set(0, 10, 0); // Position de la lumière
//   scene.add(directionalLight);

//   const material = new MeshStandardMaterial({ color: 0x808080, roughness: 0.5, metalness: 0.5 });
//   scene.traverse((child) => {
//     if (child.isMesh) {
//       child.material = material;
//     }
//   });


// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { useGLTF } from '@react-three/drei';

// const Scene = () => {
//   const group = useRef();
//   const { scene } = useGLTF(`${process.env.PUBLIC_URL}/rugbyball`);

//   useFrame(() => {
//     // Logique de mise à jour de la scène
//   });

//   return (
//     <group ref={group} dispose={null} rotation-y={0.4} position={[1, -1, 0.4]}>
//       <primitive object={scene} scale={[0.4, 0.4, 0.4]} />
//     </group>
//   );
// };

// export default Scene





const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});







// important

// import React, { useState, useEffect } from 'react';
// import Filtre from '../Assets/icons/Filtre.png';
// import Trier from '../Assets/icons/Trier.png';
// import plus from '../Assets/icons/plus.png';
// import moins from '../Assets/icons/moins.png';
// import '../css/Homme.css';

// export const Homme = () => {
//   const [StickyLeft, setStickyLeft] = useState(false);
//   const [minPrice, setMinPrice] = useState(10);
//   const [maxPrice, setMaxPrice] = useState(500);

//   const handleStickyLeft = () => {
//     if (window.pageYOffset > 50) {
//       setStickyLeft(true);
//     } else {
//       setStickyLeft(false);
//     }
//   }

//   const handleMinPriceChange = (e) => {
//     setMinPrice(parseInt(e.target.value));
//   }

//   const handleMaxPriceChange = (e) => {
//     setMaxPrice(parseInt(e.target.value));
//   }

//   useEffect(() => {
//     window.addEventListener("scroll", handleStickyLeft);
//     return () => {
//       window.removeEventListener('scroll', handleStickyLeft);
//     }
//   }, []);

//   useEffect(() => {
//     validateRange(minPrice, maxPrice);
//   }, [minPrice, maxPrice]);

//   function validateRange(minPrice, maxPrice) {
//     if (minPrice > maxPrice) {
//       [minPrice, maxPrice] = [maxPrice, minPrice];
//     }

//     const minValue = document.getElementById("min-value");
//     const maxValue = document.getElementById("max-value");

//     minValue.innerHTML = "$" + minPrice;
//     maxValue.innerHTML = "$" + maxPrice;
//   }

//   return (
//     <div className='Homme'>
//       <h1>Vêtements pour homme (nbr)</h1>
//       <div className='Filtre'>
//         <div>
//           <img src={Filtre} alt="" />Filtre
//         </div>
//         <div>
//           <img src={Trier} alt="" />Trier par
//         </div>
//       </div>
//       <div className="tag-homme">
//         <ul>
//           <li>Tous les Vêtements</li>
//           <li>Vêtements</li>
//           <li>Short</li>
//           <li>Pantalon</li>
//           <li>Chaussure</li>
//         </ul>
//       </div>

//       <div className="wrap-lert-right">
//         <div className={`left-homme${StickyLeft ? " sticky" : ""} `}>
//           <h2>Filtre</h2>
//           <div>
//             <ul>
//               <li>Couleur <img src={plus} alt="" /></li>
//               <li>Taille <img src={plus} alt="" /></li>
//               <li>Promo <img src={plus} alt="" /></li>
//               <li>
//                 <div className="price-content">
//                   <div>
//                     <label>Min</label>
//                     <p id="min-value">$10</p>
//                   </div>
//                   <div>
//                     <label>Max</label>
//                     <p id="max-value">$500</p>
//                   </div>
//                 </div>
//                 <div className="range-slider">
//                   <input
//                     type="range"
//                     className="min-price"
//                     value={minPrice}
//                     min="10"
//                     max="500"
//                     step="10"
//                     onChange={handleMinPriceChange}
//                   />
//                   <input
//                     type="range"
//                     className="max-price"
//                     value={maxPrice}
//                     min="10"
//                     max="500"
//                     step="10"
//                     onChange={handleMaxPriceChange}
//                   />
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className='right-homme'>
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//       </div>
//     </div>
//   );
// };






// import "../css/Quiz.css"
// import axios from 'axios'
// import modify from "../Assets/icons/modify.png";
// import del from "../Assets/icons/sup.png";
// import { useState , useEffect } from 'react'

// export const Quiz = () => {
//   const [theme , settheme]= useState('')
//   const [question , setquestion]= useState('')
//   const [reponse , setreponse]= useState('')
//   const [quizs , setquizs ] = useState([])
//   const [modif , setmodif] = useState(null)



//   const API= "http://localhost:3001/quiz"

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try{
//     await axios.post(API, { theme, question, reponse })
//     setquizs(prevQuizs => [...prevQuizs, { theme, question, reponse }])
//         settheme('');
//         setquestion('');
//         setreponse('');
//   }catch (error) {
//     console.log(error)
//   }}
  
//   const modification = (quiz) => {
//     setmodif(quiz.id);
//     settheme(quiz.theme);
//     setquestion(quiz.question);
//     setreponse(quiz.reponse);
//   };

//   const submitmodif = async () => {
//     if (modif) { 
//       try {
//         const response = await axios.put(`${API}/${modif}`, { theme, question, reponse });
//         if (response.status === 200) {
//           setquizs(quizs.map(q => q.id === modif ? { ...q, theme, question, reponse } : q));
//           setmodif(null); 
//         }
//       } catch (error) {
//         console.error("Erreur lors de la modification du quiz: ", error);
//       }
//     }
//   };

//   // supprimer
//   const deleteQuiz = async (quizId) => {
//     try {
//       const response = await axios.delete(`${API}/${quizId}`);
//       console.log(response.status)
//       if (response.status === 200) {
//         setquizs(quizs.filter(quiz => quiz.id !== quizId));
//         window.location.reload()
//       }
//     } catch (error) {
//       console.error("y'a erreur mon gars: ", error);
//     }
//   };

//   useEffect(() => {
//     axios.get(API)
//       .then((res) => {
//         setquizs(res.data);
//       })
//       .catch((err) => {
//         console.error("Error: ", err);
//       });
//   }, []);
  

//   return (
//     <div className='Quiz'>
//       <div className='wrap-Quiz-form'>
//         <div className='Quiz-form'>
//         <h1>Quiz</h1>
//         <form onSubmit={handleSubmit}>
//             <label htmlFor="theme">Thème</label>
//             <input
//               type="text"
//               value={theme}
//               onChange={(e) => settheme(e.target.value)}
//             />
//             <label htmlFor="question">Question</label>
//             <input
//               type="text"
//               value={question}
//               onChange={(e) => setquestion(e.target.value)}
//             />
//             <label htmlFor="reponse">Réponse</label>
//             <input
//               type="text"
//               value={reponse}
//               onChange={(e) => setreponse(e.target.value)}
//             />
//             <input type="submit" value="Submit" />
//           </form>
//       </div>
//       </div>
//       <div className='affichage'>
//       <div className="allthem"> 
//         {quizs.map((quiz, index) => {
//         return (
//           <div className="card" key={quiz.id}>
//                 {modif === quiz.id ? (
//                   <form onSubmit={(e) => {
//                     e.preventDefault();
//                     submitmodif();
//                   }}>
//                     <input
//                       type="text"
//                       value={theme}
//                       onChange={(e) => settheme(e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       value={question}
//                       onChange={(e) => setquestion(e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       value={reponse}
//                       onChange={(e) => setreponse(e.target.value)}
//                     />
//                     <button type="submit">Enregistrer</button>
//                     <button onClick={() => setmodif(null)}>Annuler</button>
//                   </form>
//                 ) : (
//                   <>
//                     <div><p><b>Thème</b>: {quiz.theme}</p></div>
//                     <div><p><b>Question</b>: {quiz.question}</p></div>
//                     <div><p><b>Réponse</b>: {quiz.reponse}</p></div>
//                     <div className="icon-action">
//                       <img onClick={() => deleteQuiz(quiz.id)} src={del} alt="Supprimer" />
//                       <img onClick={() => modification(quiz)} src={modify} alt="Modifier" />
//                     </div>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//       </div>
//     </div>
//     </div>
//   )
// }



// .Quiz{
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(2,50%);
//   padding: 0 10px ;
//   padding-top: 75px;
//   height: 100vh;
// }
// .Quiz h1{
//   margin: 20px 0;
// }
// .Quiz .wrap-Quiz-form {
//   width: 100%;
//   display: flex;
//   position: relative;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid red;

// }
// .Quiz .Quiz-form form input{
//   display: block;
//   width: 400px;
//   height: 35px;
// }
// .Quiz .Quiz-form form input[type=submit]{
//   margin: 20px 0;
//   background-color: #ffc800;
//   outline: none;
//   border: none;
// }

// .Quiz .affichage{
//   border: 1px solid black;
// }
// .Quiz .affichage .allthem{
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: space-around;
// }
// .Quiz .affichage .card{
//   border: 1px solid  black;
//   width: 250px;
//   height: 150px;
//   margin: 5px 0;
//   position: relative;
// }
// .icon-action{
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   position: absolute;
//   bottom: 5px;
//   padding: 0 3px;
  
// }
// .icon-action img:last-child{
//   width: 25px;
//   height: 25px;
//   cursor: pointer;
// }
// .icon-action img:first-child{
//   width: 35px;
//   height: 35px;
//   right: 0;
//   cursor: pointer;
// 








Overlay add

{/* <div className='wrap-Overlay-add'>
        <div className='Overlay-add'>
        <h1>Quiz</h1>
        <form onSubmit={handleSubmit}>
          
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setnom(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />

          <label htmlFor="couleur">Couleur</label>
          <input
            type="text"
            value={couleur}
            onChange={(e) => setcouleur(e.target.value)}
          />

          <label htmlFor="taille">Taille</label>
          <input
            type="text"
            value={taille}
            onChange={(e) => settaille(e.target.value)}
          />

          <label htmlFor="prix">Prix</label>
          <input
            type="text"
            value={prix}
            onChange={(e) => setprix(e.target.value)}
          />

          
          <label htmlFor="categorie">Catégorie</label>
          <input
            type="text"
            value={categorie}
            onChange={(e) => setcategorie(e.target.value)}
          />
          
          <label htmlFor="promo">Promo</label>
          <input
            type="text"
            value={promo}
            onChange={(e) => setpromo(e.target.value)}
          />
          <label htmlFor="cateType">CatégorieType</label>
          <input
            type="text"
            value={cateType}
            onChange={(e) => setcateType(e.target.value)}
          />
           <label htmlFor="image">Image</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setimage(e.target.value)}
          />


          <input type="submit" value="Submit" />
        </form>
      </div>
      </div> */}


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
  






important
Front 
import "../css/Admin.css";
import add from '../Assets/icons/add.png';
import { useState, useEffect } from 'react';
import close from '../Assets/icons/close.png';
import axios from 'axios';

export const Admin = () => {
  const localhost = "http://localhost:3001";
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [couleur, setCouleur] = useState('');
  const [taille, setTaille] = useState('');
  const [prix, setPrix] = useState('');
  const [promo, setPromo] = useState('');
  const [categorie, setCategorie] = useState('');
  const [cateType, setCateType] = useState('');
  const [images, setImages] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [produits, setProduits] = useState([]);

  const API = "http://localhost:3001/produits";

  useEffect(() => {
    axios.get(API)
      .then((res) => {
        setProduits(res.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nomProduit', nom);
      formData.append('description', description);
      formData.append('prix', prix);
      formData.append('categorie', categorie);
      formData.append('promo', promo);
      formData.append('cateType', cateType);
      formData.append('couleur', couleur);
      formData.append('taille', taille);


      if (images.length > 0) {
        formData.append('images', images[0]);
      }

      await axios.post(API, formData);
      setOverlayVisible(false); 
      window.location.reload()
    } catch (error) {
      console.error('Error :', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API}/${productId}`);
      setProduits((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleEdit = (productId) => {
    
    const productToEdit = produits.find((product) => product.id === productId);
  
    
    setNom(productToEdit.nomProduit || '');
    setDescription(productToEdit.description || '');
    setPrix(productToEdit.prix || '');
    setCategorie(productToEdit.categorie || '');
    setPromo(productToEdit.promo || '');
    setCateType(productToEdit.cateType || '');
    setCouleur(productToEdit.couleur || '');
    setTaille(productToEdit.taille || '');

    setEditingProduct(productToEdit);
    setOverlayVisible(true);
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      await axios.put(`${API}/${editingProduct.id}`, {
        nomProduit: nom,
        description,
        prix,
        categorie,
        couleur,
        taille,
        promo,
        cateType,
      });

      setProduits((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id
            ? { ...product, nomProduit: nom, description,prix, categorie, couleur, taille, promo, cateType }
            : product
        )
      );

      setOverlayVisible(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="wrap-Admin">
      <div className='Admin'>
        <div className="sidebar">
          <div>
            <div className="logo"></div>
            <ul>
              <li>Tous les vêtements</li>
              <li>Homme</li>
              <li>Femme</li>
              <li>Enfant</li>
              <li>Accessoires</li>
            </ul>
          </div>
        </div>
        <div className="lesproduits">
          <div className="table">
            <div className="table-header">
              <div className="header__item"><a id="name" className="filter__link" href="#">Id</a></div>
              <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">image</a></div>
              <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">nom</a></div>
              <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Promo</a></div>
              <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">prix</a></div>
              <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#"></a></div>
            </div>
            <div className="table-content">
              {produits.map((unproduit, index) => (
                <div className="table-row" key={index}>
                  <div className="table-data">#{unproduit.id}</div>
                  <div className="table-data">
                    {unproduit.images && unproduit.images.length > 0 ? (
                      <img src={`${localhost}/uploads/${unproduit.images.split(',')[0]}`} alt="" />
                    ) : (
                      <img src={`${localhost}/uploads/default-image.jpg`} alt="Default" />
                    )}
                  </div>
                  <div className="table-data">{unproduit.nomProduit}</div>
                  <div className="table-data">{unproduit.promo}</div>
                  <div className="table-data">{unproduit.prix}.00 €</div>
                  <div className="table-data">
                    <button onClick={() => handleDelete(unproduit.id)}>Delete</button>
                    <button onClick={() => handleEdit(unproduit.id)}>Modif</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="add-button" onClick={() => setOverlayVisible(true)}>
        <img src={add} alt="" />
      </div>
      <div>
        {overlayVisible && (
          <div className="wrap-Overlay-add">
            <div className="Overlay-add">
              <h1>{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</h1>
              <form onSubmit={editingProduct ? handleUpdate : handleSubmit}>
                <div className="flex-form">
                  <div>
                    <label htmlFor="nomProduit">Nom</label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="prix">Prix</label>
                    <input
                      type="text"
                      value={prix}
                      onChange={(e) => setPrix(e.target.value)}
                    />
                    <label htmlFor="categorie">Catégorie</label>
                    <input
                      type="text"
                      value={categorie}
                      onChange={(e) => setCategorie(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="promo">Promo</label>
                    <input
                      type="text"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                    />
                    <label htmlFor="cateType">CatégorieType</label>
                    <input
                      type="text"
                      value={cateType}
                      onChange={(e) => setCateType(e.target.value)}
                    />
                    <label htmlFor="couleur">Couleur</label>
                    <input
                      type="text"
                      value={couleur}
                      onChange={(e) => setCouleur(e.target.value)}
                    />
                    <label htmlFor="images">Images</label>
                    <input type="file" id="images" onChange={(e) => setImages(e.target.files)} multiple />
                    <label htmlFor="taille">Taille</label>
                    <input
                      type="text"
                      value={taille}
                      onChange={(e) => setTaille(e.target.value)}
                    />
                  </div>
                </div>
                <div className="center-submit">
                  <input type="submit" value="Submit" />
                </div>
              </form>
              <div className="close-me">
                <button onClick={() => setOverlayVisible(false)}><img src={close} alt="" /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


Back
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
  const { nomProduit, description, categorie, couleur, taille, promo, cateType } = req.body;

  const sql = 'UPDATE produits SET nomProduit=?, description=?, categorie=?, couleur=?, taille=?, promo=?, cateType=? WHERE id=?';
  db.query(sql, [nomProduit, description, categorie, couleur, taille, promo, cateType, productId], (err, result) => {
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


