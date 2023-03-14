const Usuario = require('../../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: (req, res, next)=> {
        Usuario.findOne({email: req.body.email}, (err, userInfo)=> {

        })
    }
}
