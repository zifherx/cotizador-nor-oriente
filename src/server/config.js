const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const errorHandler = require("errorhandler");
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('../keys');
require('../helpers/passport');
const routes = require('../routes');

module.exports = (app) => {

    //Settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        helpers: require('./helpers'),
        extname: '.hbs',
    }));
    app.set('view engine', '.hbs');

    //Middleware
    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(session({
        secret: 'secretkey',
        resave: true,
        saveUninitialized: true,
        store: new MySqlStore(database)
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());


    //Global Variables
    app.use((req, res, next) => {
        app.locals.success = req.flash('success');
        app.locals.message = req.flash('message');
        app.locals.user = req.user;
        next();
    });

    //Routes
    routes(app);

    //Static Files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    //Error Handling
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    return app;
};