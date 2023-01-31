const Usuario = require('../models/usuario');

module.exports = {
    getUsuarios: ((req, res, next)=> {
        Usuario.find({}, (err, usuarios)=> {
            res.render('usuarios/index', usuarios)
        })
    }),
    getUsuarioById: ((req, res, next)=> {
        Usuario.findById(req.params.id, (err, usuario)=> {
            res.render('usuarios/update', usuario)
        })
    }),
    updateUsuario: ((req, res, next)=> {
        const update_values = {nombre: req.body.nombre}
        Usuario.findByIdAndUpdate(req.params.id, update_values, (err, usuario)=> {
            if (err) {
                res.render('usuarios/update', {errors: err.errors, usuario: new Usuario({
                        nombre: res.body.nombre,
                        email: res.body.email,
                    })
                })
            } else {
                res.redirect('/usuarios');
            }
        })
    }),
    createUsuario: ((req, res, next)=> {
        if (res.body.password != res.body.confirmPassword) {
            res.render('usuarios/create',{errors: {
                confirmPassword: {
                    message: 'Las contraseñas no coinciden'
                    }
                },
                usuario: new Usuario({
                    nombre: res.body.nombre,
                    email: res.body.email,
                })
            })
        };
        Usuario.create({
            nombre: res.body.create,
            email: res.body.email,
            password: res.body.password
        }, (err, nuevoUsuario) => {
            if (err) {
                res.render('usuarios/create', {
                    errors: err.errors, usuario: new Usuario({
                        nombre: res.body.nombre,
                        email: res.body.email,
                    })
                })
            } else {
                nuevoUsuario.enviarEmailBienvenida();
                res.redirect('/usuarios')
            }
        }).then()
    }),
    deleteUsuario: ((req, res, next) => {
        Usuario.findByIdAndDelete(req.body.id, (err) => {
            if (err) {
                next(err);
            } else {
                res.redirect('/usuarios')
            }
        })
    })
}