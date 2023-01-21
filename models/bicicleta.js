const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BicicletaSchema = new Schema(
    {
    id: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number],
        index: {
            type: '2dsphere',
            sparse: true
        },
     },
    },
    {
        statics: {
            createInstance(id, color, modelo, ubicacion) {
                return new this({
                    id: id,
                    color: color,
                    modelo: modelo,
                    ubicacion: ubicacion
                });
            },
            getAll(callback) {
                return this.find({}, callback);
            },
            addBici(bici, callback) {
                this.create(bici, callback)
            },
            getById(id, callback) {
                return this.findOne({id: id}, callback);
            },
            removeById(id, callback) {
                return this.deleteOne({id: id}, callback);
            },
        }
    }
)

const Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function() {
    return 'id: ' + this.id + '| color: ' + this.color;
}

Bicicleta.allBicis = [];
Bicicleta.add = function(bicicleta) {
    Bicicleta.allBicis.push(bicicleta)
}
Bicicleta.findById = function(idBici) {
    let bicicleta = Bicicleta.allBicis.find(bicicleta => bicicleta.id = idBici);
    if (bicicleta) {
        return bicicleta
    } else {
        throw new Error(`No existe la bicicleta con id ${idBici}`)
    }
}
Bicicleta.removeById = function(idBici) {
    Bicicleta.allBicis.find(bicicleta => bicicleta.id = idBici);
    for(let i = 0; i < Bicicleta.allBicis.length; i++) {
        if (Bicicleta.allBicis[i].id == idBici) {
            Bicicleta.allBicis.splice(i,1)
        }
    }
}

module.exports = Bicicleta;
module.exports = mongoose.model('Bicicleta', BicicletaSchema);