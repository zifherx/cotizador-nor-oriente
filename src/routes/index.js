const express = require('express');
const router = express.Router();

//Controllers
const home = require('../controllers/home');
const auth = require('../controllers/auth');
const vehicles = require('../controllers/vehicles');

const { isLoggedIn, isNotLoggedIn } = require('../helpers/validacion');


module.exports = app => {

    router.get('/', home.index);
    //router.get('/about', home.about);

    //Authentication Routes
    router.get('/signin', isNotLoggedIn, auth.renderSignIn);
    router.post('/signin', isNotLoggedIn, auth.signIn);

    router.get('/signup', isNotLoggedIn, auth.renderSignUp);
    router.post('/signup', isNotLoggedIn, auth.signUp);

    router.get('/profile', isLoggedIn, auth.renderProfile);

    router.get('/logout', isLoggedIn, auth.logout);

    router.get('/vehicles', isLoggedIn, vehicles.index);

    router.get('/vehicles/add', isLoggedIn, vehicles.renderCreate);
    router.post('/vehicles/add', isLoggedIn, vehicles.createVehicle);

    router.get('/vehicles/edit/:id', isLoggedIn, vehicles.renderEdit);
    router.post('/vehicles/edit/:id', isLoggedIn, vehicles.editVehicle);

    router.get('/vehicles/delete/:id', isLoggedIn, vehicles.removeVehicle);

    router.get('/cotizador', isNotLoggedIn, home.cotizador);

    router.post('/cotizador', isNotLoggedIn, home.buscarProducto);

    app.use(router);
};