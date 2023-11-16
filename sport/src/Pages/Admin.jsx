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
        images.forEach((image) => {
          formData.append('images', image);
        });
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
            ? { ...product, nomProduit: nom, description, prix, categorie, couleur, taille, promo, cateType }
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