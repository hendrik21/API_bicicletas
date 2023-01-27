const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UsuarioSchema = require('../models/usuario');

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200
    },
    Usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario',

    },

});

module.exports = mongoose.model('Token', TokenSchema);