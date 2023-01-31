const mongoose = require('mongoose');
const Reserva = require('reserva');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uniqueValidator = require('mongoose-unique-validator');
const Token = require('../models/token');
const transporter = require('../mailer/mailer')
const nodemailer = require('nodemailer');
const mailer = nodemailer.createTransport(transporter)

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
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
        },
        confirmPassword: {
            type: String,
            required: [true, 'Debes confirmar la contraseña'],
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
            reservar(idBici, fechaInicio, fechaFinal, callback) {
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
            },
            enviarEmailBienvenida(callback) {
                const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
                const email_destination = this.email;
                token.save((err) => {
                    if (err) {
                        throw err
                    };
                    const mailOptions = {
                        from: 'no-reply@bicicletas.com',
                        to: email_destination,
                        subject: 'Verificacion de cuenta',
                        text: 'Hola,\n\n'+', Por favor, para verificar su cuenta, haga click en este link: \n' + 'https://localhost:3000/token/confirmation/' + token.token + '.\n'
                    };
                    mailer.sendMail(mailOptions, (err)=> {
                        if (err) {
                            throw err;
                        }
                        console.log('A verification has been sent to' + email_destination)
                    })
                })
            }
        }
    })
UsuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'})
UsuarioSchema.pre('save', (next)=> {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
})

module.exports = mongoose.model('Usuario', UsuarioSchema);