
const express = require('express');
const router = express.Router();

const pagoController = require('../controllers/pagoController');

// CONSULTAR
router.get('/getPagos', pagoController.getPagos);
router.get('/getPagoById/:id', pagoController.getPagoById);

// CREAR
router.post('/crearPago', pagoController.crearPago);

// ACTUALIZAR
router.put('/actualizarPago/:id', pagoController.actualizarPago);

// ELIMINAR
router.delete('/eliminarPago/:id', pagoController.eliminarPago);

module.exports = router;
