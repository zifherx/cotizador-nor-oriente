const pool = require('../config/database');

const ctrl = {};

ctrl.index = (req, res) => {
    res.render('index');
};

ctrl.cotizador = (req, res) => {
    res.render('cotizador');
};

ctrl.buscarProducto = async(req, res) => {
    const { codigo_tdp } = req.body;
    const vehicle = await pool.query('SELECT * from vehicles WHERE codigo_tdp = ?', [codigo_tdp]);
    //res.render('/cotizador', { vehicle: vehicles[0] });
    res.json(vehicle[0]);
}

module.exports = ctrl;