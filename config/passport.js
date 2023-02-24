const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new LocalStrategy(
    (email, password, done) => {
        Usuario.findOne({email: email}, (usuario, err) => {
            if (err) {
                return done(err)
            };
            if (!usuario) {
                return done(null, false, {message: 'El usuario no se encuentra registrado'})
            };
            if (!usuario.validarPassword(password)) {
                return done(null, false, {message: 'Contraseña incorrecta'})
            };
            return done(null, usuario);
        })
    }
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