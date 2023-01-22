const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const ReservaSchema = new Schema(
    {
    fechaInicio: Date,
    fechaFinal: Date,
    bicicleta: {type: mongoose.Schema.Types.ObjectId, ref: 'Bicicleta'},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
    },
    {
    methods: {
        calcularFecha(fechaInicio, fechaFinal) {
            return moment(fechaFinal).diff(moment(fechaInicio), 'days') +1;
        }
    }
})

module.exports = mongoose.model('Reserva', ReservaSchema);