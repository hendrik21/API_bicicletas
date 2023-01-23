const express = require('express');
const router = express.Router;
const usuarioController = require('../../controllers/api/usuarioControllerAPI');

router.get('/', usuarioController.usuario_list);
router.post('/create', usuarioController.usuario_create);
router.post('/reservar', usuarioController.usuario_reservar);
