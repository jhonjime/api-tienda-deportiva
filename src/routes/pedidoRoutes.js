
const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

// READ
router.get('/getPedidos', pedidoController.getPedidos);
router.get('/getPedidoById/:id', pedidoController.getPedidoById);

// CREATE
router.post('/crearPedido', pedidoController.crearPedido);

// UPDATE
router.put('/actualizarPedido/:id', pedidoController.actualizarPedido);

// DELETE
router.delete('/eliminarPedido/:id', pedidoController.eliminarPedido);

module.exports = router;
