const mongoose = require('mongoose');
const Reserva = require('reserva');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validaterEmail = ((email)=> {
    const expRegular = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return expRegular.test(email);
})

const UsuarioSchema = new Schema({
        nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, 'El email es obligatorio'],
            validate: [validaterEmail, 'Debes ingresar un email válido'],
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g]
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
        },
        passwordResetToken: String,
        passwordResetTokenExpires: Date,
        verified: {
            type: Boolean,
            default: false
        }
},
    {
        methods: {
            reservar(idBici, fechaInicio, fechaFin, callback) {
                const reserva = new Reserva({
                    fechaInicio: fechaInicio,
                    fechaFinal: fechaFinal,
                    usuario: this._id,
                    bicicleta: idBici
                })
                reserva.save(callback)
            },
            validarPassword(password) {
                return bcrypt.compareSync(password. this.password);
            }
        }
    })

UsuarioSchema.pre('save', (next)=> {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
})

module.exports = mongoose.model('Usuario', UsuarioSchema);