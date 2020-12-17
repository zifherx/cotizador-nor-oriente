const pool = require("../config/database");

const ctrl = {};

ctrl.index = async(req, res) => {
    const vehicles = await pool.query('SELECT * FROM vehicles');
    console.log(vehicles);
    res.render('vehicles/list', { vehicles });
};

ctrl.renderCreate = (req, res) => {
    res.render('vehicles/add');
};

ctrl.createVehicle = async(req, res) => {
    const { codigo_tdp, modelo, anio, precio, incentivo, campania } = req.body;
    const newVehicle = {
        codigo_tdp,
        modelo,
        anio,
        precio,
        incentivo,
        campania
    };
    await pool.query('INSERT INTO vehicles SET ?', [newVehicle]);
    req.flash('success', 'Vehículo guardado satisfactoriamente');
    res.redirect('/vehicles');
};

ctrl.renderEdit = async(req, res) => {
    const { id } = req.params;
    const vehicles = await pool.query('SELECT * from vehicles WHERE id = ?', [id]);
    res.render('vehicles/edit', { vehicle: vehicles[0] });
};

ctrl.editVehicle = async(req, res) => {
    const { id } = req.params;
    const { codigo_tdp, modelo, anio, precio, incentivo, campania } = req.body;
    const newVehicle = {
        codigo_tdp,
        modelo,
        anio,
        precio,
        incentivo,
        campania
    };
    await pool.query('UPDATE vehicles SET ? WHERE id = ?', [newVehicle, id]);
    req.flash('success', 'Vehículo actualizado satisfactoriamente');
    res.redirect('/vehicles');
};

ctrl.removeVehicle = async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
    req.flash('success', 'Vehículo eliminado satisfactoriamente');
    res.redirect('/vehicles');
};

module.exports = ctrl;