const passport = require('passport');

const ctrl = {};

ctrl.renderSignIn = (req, res) => {
    res.render('auth/signin');
};

ctrl.renderSignUp = (req, res) => {
    res.render('auth/signup');
};

ctrl.renderProfile = (req, res) => {
    res.render('profile');
};

ctrl.signIn = (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
};

ctrl.signUp = passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
});

ctrl.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports = ctrl;