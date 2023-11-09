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