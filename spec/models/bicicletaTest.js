const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uri = "mongodb://127.0.0.1:27017/test";
const Bicicleta = require('../../models/bicicleta');
const express = require("express");

mongoose.set('strictQuery', true);

//PRUEBAS CON PERSISTENCIA USANDO MONGOOSE

describe('Testing Bicicletas', () => {
    beforeEach(function () {

        mongoose.connect(uri, {useNewUrlParser: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('¡Conexión exitosa a la base de datos de prueba!');
        });
    });
    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) {
                throw err;
            };
            done();
        });
    });
    describe('Bicicleta.createInstance', () => {
        it('Crear una instancia de bicicleta', () => {
            const bici = Bicicleta.createInstance(0, 'verde', 'BMX', [43254.345, -4523.5]);
            expect(bici.id).toBe(0);
        });
    });
    describe('Bicicleta.getAll', () => {
        it('Obtiene la lista vacía', (done) => {
            Bicicleta.getAll(function (err, bicis) {
                console.log('PRUEBA getAll: ' + bicis)
                if (err) {
                    throw err;
                }
                expect(bicis.length).toEqual(0);
                done();
            });
        });
    });
    describe('Bicicleta.addBici', () => {
        it('Añadir una bici', (done) => {
            const bici = new Bicicleta({id: 1, color: 'Rojo', modelo: 'DEPORTIVA'})
            Bicicleta.addBici(bici,function (err, newBici) {
                if (err) {
                    throw err;
                };
                Bicicleta.getAll(function (err, bicis) {
                    console.log(bicis);
                    expect(bicis[0].id).toEqual(1);
                    done();
                });
            });
        });
    });
    describe('Bicicleta.getById', () => {
        it('Obtiene una bici mediante su ID', (done) => {
            Bicicleta.getAll(function (err, bicis) {
                expect(bicis.length).toEqual(0);
                const bici = new Bicicleta({id: 1, color: 'Rojo', modelo: 'DEPORTIVA'});
                Bicicleta.addBici(bici,function (err, newBici) {
                    if (err) {
                        throw err;
                    };
                    Bicicleta.getById(bici.id, function (err, targetBici) {
                        expect(targetBici.id).toEqual(bici.id);
                        done();
                    })
                });
            })
        });
    });
})

//PRUEBAS CON PERSISTENCIA SIN BASE DE DATOS

/*beforeEach(() => {
    Bicicleta.allBicis = [];
})

describe('Bicicleta.allBicis', () => {
    it('Comienza con 0 bicicletas', () => {
        expect(Bicicleta.allBicis.length).toBe(0)
    })
})

describe('Bicicleta.add', ()=> {
    it('Añadimos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let bici = new Bicicleta(1, 'rojo', 'bmx', [7.1131514560550615, -73.12300419943512]);
        Bicicleta.add(bici);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(bici);
    })
})

describe('Bicicleta.findById', () => {
    it('Devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let bici = new Bicicleta(1, 'rojo', 'bmx', [7.1131514560550615, -73.12300419943512]);
        Bicicleta.add(bici);
        let targetBici = Bicicleta.findById(1)
        expect(targetBici.id).toBe(1)
    })
})

describe('Bicicleta.removeById', () => {
    it('Remover la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let bici = new Bicicleta(1, 'rojo', 'bmx', [7.1131514560550615, -73.12300419943512]);
        Bicicleta.add(bici);
        let targetBici = Bicicleta.findById(1);
        Bicicleta.removeById(targetBici.id);
        expect(Bicicleta.allBicis.length).toBe(0);
    })
})*/

