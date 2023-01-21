let request = require('request')
let server = require('../../bin/www');
let Bicicleta = require('../../models/bicicleta');

beforeEach(() => {
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
})


