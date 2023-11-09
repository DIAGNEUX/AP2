
import "../css/Admin.css"
import axios from 'axios'
import modify from "../Assets/icons/modify.png";
import del from "../Assets/icons/sup.png";
import { useState , useEffect } from 'react'

export const Admin = () => {
  const [nom , setnom]= useState('')
  const [description , setdescription]= useState('')
  const [couleur , setcouleur]= useState('')
  const [taille , settaille]=useState('')
  const [prix , setprix]=useState('')
  const [promo , setpromo]=useState('')
  const [categorie , setcategorie]=useState('')
  const [cateType , setcateType]=useState('')
  const [image , setimage]=useState('')
  const [modif , setmodif] = useState(null)



  const API= "http://localhost:3001/produits"

  const handleSubmit = async (e) => {
    e.preventDefault();
  
}
  
  // const modification = (quiz) => {
  //   setmodif(quiz.id);
  //   settheme(quiz.theme);
  //   setquestion(quiz.question);
  //   setreponse(quiz.reponse);
  // };

  // const submitmodif = async () => {
  //   if (modif) { 
  //     try {
  //       const response = await axios.put(`${API}/${modif}`, { theme, question, reponse });
  //       if (response.status === 200) {
  //         setquizs(quizs.map(q => q.id === modif ? { ...q, theme, question, reponse } : q));
  //         setmodif(null); 
  //       }
  //     } catch (error) {
  //       console.error("Erreur lors de la modification du quiz: ", error);
  //     }
  //   }
  // };

  // supprimer
  // const deleteQuiz = async (quizId) => {
  //   try {
  //     const response = await axios.delete(`${API}/${quizId}`);
  //     console.log(response.status)
  //     if (response.status === 200) {
  //       setquizs(quizs.filter(quiz => quiz.id !== quizId));
  //       window.location.reload()
  //     }
  //   } catch (error) {
  //     console.error("y'a erreur mon gars: ", error);
  //   }
  // };

  // useEffect(() => {
  //   axios.get(API)
  //     .then((res) => {
  //       setquizs(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error: ", err);
  //     });
  // }, []);
  

  return (
    <div className="wrap-Admin">
    <div className='Admin'>
      <div className="sidebar">
        <div>
          <div className="logo">
            

          </div>
          <ul>
            <li>Tous les vetement</li>
            <li>Homme</li>
            <li>Femme</li>
            <li>Enfant</li>
            <li>Accesoires</li>
          </ul>
        </div>
      </div>
      <div className="lesproduits">

      </div>
    </div>
    </div>
  )
}
