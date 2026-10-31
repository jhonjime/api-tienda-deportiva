
const express = require('express');
const router = express.Router();

const varianteController = require('../controllers/varianteController');

// CONSULTAR
router.get('/getVariantes', varianteController.getVariantes);
router.get('/getVarianteById/:id', varianteController.getVarianteById);

// CREAR
router.post('/crearVariante', varianteController.crearVariante);

// ACTUALIZAR
router.put('/actualizarVariante/:id', varianteController.actualizarVariante);

// ELIMINAR
router.delete('/eliminarVariante/:id', varianteController.eliminarVariante);

module.exports = router;
