const request = require('supertest');
const app = require('../Server');

describe('/api/users', () => {
    it('responds with json', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toEqual(200);
        
    })
})

describe ('/api/users/createuser', () => {
    it('responds with json', async () => {
        const response = await request(app)
        .post('/api/users/createuser')
        .send({
            nom: "test",
            prenom: "test",
            email: "test",
            mdp: "test",
        })
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ "message": "Utilisateur enregistré avec succès"});
    })
})

describe('/api/products', () => {
    it('responds with json', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toEqual(200);
        
    })
})

// describe ('/api/products', () => {
//     it('responds with json', async () => {
//         const response = await request(app)
//         .post('/api/products')
//         .send({
//             nomProduit:"Alioune",
//             images:"image-1700136110235-Nike Haut de survÃªtement zippÃ© Running Pacer Femme 1.webp,image-1700136110238-Nike Haut de survÃªtement zippÃ© Running Pacer Femme 2.webp,image-1700136110240-Nike Haut de survÃªtement zippÃ© Running Pacer Femme 3.webp,image-1700136110242-Nike Haut de survÃªtement zippÃ© Running Pacer Femme 4.webp,image-1700136110244-Nike Haut de survÃªtement zippÃ© Running Pacer Femme 5.webp",
//             description:"ffgugyu",
//             categorie:"hghg",
//             couleur:"sqd",
//             taille:"sqd",
//             promo:0,
//             cateType:"",
//             prix:0,
//             best:"dshjds",
//             best:"ddfd",
//             Quantité:20
//         })
//         expect(response.status).toEqual(200);
//         expect(response.body).toEqual({ "message": "Utilisateur enregistré avec succès"});
//     })
// })