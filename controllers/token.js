const Usuario = require('../models/usuario');
const Token = require('../models/token');

module.exports = {
    confirmGet: ((req, res, next)=> {
        Token.findOne({token: req.body.token}, (err, token)=> {
            if (!token) {
                return res.status(400).send({
                    type: 'not-verified',
                    message: 'No hemos podido encontrar un usuario relacionado a ese token; posiblemente expiró y debas solicitar un nuevo token'
                })
            };
            Usuario.findById(token._userId, (err, usuario) => {
                if (!usuario) {
                    return res.status(400).send({
                        message: 'Lo siento, no hemos podido encontrar el usuario que especificas'
                    })
                };
                if (usuario.verified) {
                    return res.redirect('/usuarios');
                };
                usuario.verified = true;
                usuario.save((err)=> {
                    if (err) {
                        return res.status(500).send({
                            message: err
                        })
                    };
                    res.redirect('/');
                })
            })
        })
    })
}