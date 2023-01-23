const Usuario = require('../../models/usuario');

exports.usuario_list = function(req, res) {
    Usuario.find({}, (err, usuarios) => {
        res.status(200).json({
            usuarios: usuarios
        });
    });
}

exports.usuario_create = function(req, res) {
    const usuario = new Usuario({nombre: req.body.nombre});
    usuario.save((err) => {
        res.status(200).json(usuario);
    });
}

exports.usuario_reservar = function(req, res) {
    Usuario.findById(req.body.id, (err, usuario) => {
        usuario.reservar(req.body.usuario, req.body.fechaInicio, req.body.fechaFinal, (err)=> {
            res.status(200).send();
        });
    });
}