const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new LocalStrategy(

));

passport.serializeUser((usuario, callback) => {
    callback(null, usuario.id)
});

passport.deserializeUser((id, callback) => {
    Usuario.findById(id, (err, usuario) => {
        callback(err,usuario);
    });
});

module.exports = passport;