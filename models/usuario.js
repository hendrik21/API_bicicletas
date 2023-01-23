const mongoose = require('mongoose');
const Reserva = require('reserva');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre: String,

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
            }
        }
    })

module.exports = mongoose.model('Usuario', UsuarioSchema);