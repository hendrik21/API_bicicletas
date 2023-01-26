const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UsuarioSchema = require('../models/usuario');

const TokenSchema = new Schema({
    token: String,
    fechaCreacion: Date,
    Usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },

});

module.exports = mongoose.model('Token', TokenSchema);