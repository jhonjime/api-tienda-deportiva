
const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');

// CONSULTAR
router.get('/getProductos', productoController.getProductos);
router.get('/getProductoById/:id', productoController.getProductoById);

// CREAR
router.post('/crearProducto', productoController.crearProducto);

// ACTUALIZAR
router.put('/actualizarProducto/:id', productoController.actualizarProducto);

// ELIMINAR
router.delete('/eliminarProducto/:id', productoController.eliminarProducto);

module.exports = router;
