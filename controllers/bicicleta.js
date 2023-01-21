var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    res.render('bicicletas/index', {bicis: Bicicleta.allBicis});
}

exports.bicicleta_create_get = function(req, res) {
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo, [req.body.latitud, req.body.longitud]);
    Bicicleta.add(bici);
    res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = function(req, res) {
    Bicicleta.removeById(req.body.id);
    res.redirect('/bicicletas')
}
