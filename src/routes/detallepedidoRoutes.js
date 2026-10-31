
const express = require('express');
const router = express.Router();

const detallePedidoController = require('../controllers/detallePedidoController');

// READ
router.get('/getDetalles', detallePedidoController.getDetalles);
router.get('/getDetalleById/:id', detallePedidoController.getDetalleById);

// CREATE
router.post('/crearDetalle', detallePedidoController.crearDetalle);

// UPDATE
router.put('/actualizarDetalle/:id', detallePedidoController.actualizarDetalle);

// DELETE
router.delete('/eliminarDetalle/:id', detallePedidoController.eliminarDetalle);

module.exports = router;
