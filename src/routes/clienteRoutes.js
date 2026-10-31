
const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

// CONSULTAR TODOS LOS CLIENTES
router.get('/getClientes', clienteController.getClientes);

// CONSULTAR UN CLIENTE POR ID
router.get('/getClienteById/:id', clienteController.getClienteById);

// CREAR UN CLIENTE
router.post('/crearCliente', clienteController.crearCliente);

// ACTUALIZAR UN CLIENTE
router.put('/actualizarCliente/:id', clienteController.actualizarCliente);

// ELIMINAR UN CLIENTE
router.delete('/eliminarCliente/:id', clienteController.eliminarCliente);

module.exports = router;
