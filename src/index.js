const express = require('express');
const config = require('./server/config');

//Inicializador
const app = config(express());

//Database
require('./config/database');

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});