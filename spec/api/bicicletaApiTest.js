const request = require('request');
let server = require('../../bin/www');
let Bicicleta = require('../../models/bicicleta');
const mongoose = require("mongoose");
const express = require("express");
const uri = "mongodb://127.0.0.1:27017/test";
const api_uri = "http://localhost:3000/api/bicicletas/"

//PRUEBAS UNITARIAS CON CONEXIÓN A BASE DE DATOS

describe('Testing API bicicletas', function () {
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
    describe('GET Bicicletas', () => {
        it('status 200', (done) => {
            request.get(api_uri, function (err, response, body) {
                if (err) {
                    throw err;
                };
                const result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    });
    describe('POST Bicicleta', () => {
        it('status 200', (done) => {
            const headers = {'content-type':'application/json'};
            const bici = '{"id": 3, "color": "rojo", "modelo": "bmx", "ubicacion": [7.1131514560590615, -73.12301419943512]';

            request.post({
                    headers: headers,
                    url: api_uri + 'create',
                    body: bici,
                }, function (err, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                }
            )
        })
    })
});

//PRUEBAS UNITARIAS SIN CONEXIÓN A BASE DE DATOS

/*beforeEach(() => {
    Bicicleta.allBicis = [];
})

describe('Bicicleta API',() => {
    describe('GET Bicicletas', () => {
        it('status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            let bici = new Bicicleta(1, 'rojo', 'bmx', [7.1131514560550615, -73.12300419943512]);
            Bicicleta.add(bici)
            request.get('https://localhost:3000/api/bicicletas', function(error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        })
    })
    describe('POST Bicicleta', () => {
        it('status 200', (done) => {
            const headers = {'content-type':'application/json'};
            const bici = new Bicicleta(1, 'rojo', 'bmx', [7.1131514560550615, -73.12300419943512]);
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: JSON.stringify(bici)
                }, function (error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                }
            )
        })
    })
})*/


