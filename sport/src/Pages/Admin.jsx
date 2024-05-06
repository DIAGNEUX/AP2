import "../css/Admin.css";
import add from '../Assets/icons/add.png';
import { useState, useEffect } from 'react';
import close from '../Assets/icons/close.png';
import axios from 'axios';
import sup from "../Assets/icons/icons8-poubelle-52.png"
import modif from "../Assets/icons/icons8-modifier-64.png"
import utilisateur from "../Assets/icons/icons8-utilisateur-50.png"
import produit from "../Assets/icons/icons8-produit-50.png"
import commande from "../Assets/icons/icons8-ordre-d'achat-50.png"
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
  const [users, setUsers] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('produit');

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const produitsAPI = "http://localhost:3001/api/admin/products";
  const usersAPI = "http://localhost:3001/api/admin/users";


  useEffect(() => {
    axios.get(produitsAPI)
    .then((res) => {
      setProduits(res.data);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des données de l\'API des produits :', error);
    });

  axios.get(usersAPI)
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des données de l\'API des utilisateurs :', error);
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
        images.forEach((image) => {
          formData.append('images', image);
        });
      }


      await axios.post( 'http://localhost:3001/api/product', formData);
      setOverlayVisible(false);
      window.location.reload()
    } catch (error) {
      console.error('Error :', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${produitsAPI}/${productId}`);
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
      const formData = new FormData();
      formData.append('nomProduit', nom);
      formData.append('description', description);
      formData.append('prix', prix);
      formData.append('categorie', categorie);
      formData.append('promo', promo);
      formData.append('cateType', cateType);
      formData.append('couleur', couleur);
      formData.append('taille', taille);

      console.log("formData :", formData);
  
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append('images', image);
        });
      }

      console.log('Données à envoyer pour la mise à jour :', {
        nomProduit: nom,
        description: description,
        prix: prix,
        categorie: categorie,
        promo: promo,
        cateType: cateType,
        couleur: couleur,
        taille: taille,
        images: images,
      });
      await axios.put(`http://localhost:3001/api/product/${editingProduct.id}`, formData);

  
      setProduits((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id
            ? { ...product, nomProduit: nom, description, prix, categorie, couleur, taille, promo, cateType }
            : product
        )
      );
  
      setOverlayVisible(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);
    }
  };
  
  

  return (
    <div className="wrap-Admin">
      <div className='Admin'>
        <div className="sidebar">
          <div>
            <div className="logo"></div>
            <ul>
            <li onClick={() => handleMenuClick('produit')}><img src={produit} alt="" /> Produit</li>
              <li onClick={() => handleMenuClick('utilisateur')}> <img src={utilisateur} alt="" /> Utilisateur</li>
              <li onClick={() => handleMenuClick('commande')}> <img src={commande} alt="" /> Commande</li>
            </ul>
          </div>
        </div>
        <div className="lesproduits">
        {selectedMenuItem === 'produit' && (
            <div className="table">
            <div className="table-header">
              <div className="header__item"><a id="name" className="filter__link" href="#">Id</a></div>
              <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">image</a></div>
              <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">nom</a></div>
              <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Promo</a></div>
              <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">prix</a></div>
              <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Quantité </a></div>
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
                  <div className="table-data">{unproduit.Quantité}</div>
                  <div className="table-data">
                    <button onClick={() => handleEdit(unproduit.id)}><img src={modif} alt="" /></button>
                    <button onClick={() => handleDelete(unproduit.id)}><img src={sup} alt="" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
          {selectedMenuItem === 'utilisateur' && (
            <div className="table_utilisateur">
              <ul>
                {users.map((user, index) => (
                  <li key={index}>
                    <div className="admin_utilisateur">
                      <div className="adminLeft_utilisateur">
                      <div> <p> {user.nom && user.nom.charAt(0)}</p>.<p>{user.prenom && user.prenom.charAt(0)}</p></div>
                      </div>
                      <div className="adminRight_utilisateur">
                        <h4>{user.nom} {user.prenom}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedMenuItem === 'commande' && (
            <div className="table">
              <h1>Commande</h1>
            </div>
          )}
          
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
                    <input type="file" id="images" onChange={(e) => setImages([...e.target.files])} multiple />
                    <label htmlFor="taille">Taille</label>
                    <input
                      type="text"
                      value={taille}
                      onChange={(e) => setTaille(e.target.value)}
                    />
                  </div>
                </div>
                <div className="center-submit">
                  <input type="submit" value="Submit"  />
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