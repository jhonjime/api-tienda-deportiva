
const pedidoModel = require('../models/pedidoModel');

module.exports = {

    // CONSULTAR TODOS LOS PEDIDOS
    getPedidos: (req, res) => {
        pedidoModel.getPedidos((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({ data: result });
        });
    },

    // CONSULTAR UN PEDIDO
    getPedidoById: (req, res) => {
        const { id } = req.params;

        pedidoModel.getPedidoById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Pedido no encontrado'
                });
            }

            res.status(200).json({ data: result });
        });
    },

    // CREAR UN PEDIDO
    crearPedido: (req, res) => {
        const datos = req.body;

        if (!datos.codigo || !datos.id_cliente) {
            return res.status(400).json({
                message: 'El código y el ID del cliente son obligatorios'
            });
        }

        pedidoModel.crearPedido(datos, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Pedido creado correctamente',
                id_pedido: result.insertId
            });
        });
    },

    // ACTUALIZAR UN PEDIDO
    
actualizarPedido: (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const campos = [
        'codigo',
        'id_cliente',
        'canal',
        'fecha',
        'estado',
        'descuento',
        'costo_envio'
    ];

    if (Object.keys(datos).length === 0) {
        return res.status(400).json({
            message: 'Debes enviar al menos un campo para actualizar'
        });
    }

    pedidoModel.getPedidoById(id, (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                message: 'Pedido no encontrado'
            });
        }

        const pedidoActual = resultado[0];

        const datosActualizados = {};

        campos.forEach(campo => {
            datosActualizados[campo] =
                datos[campo] !== undefined
                    ? datos[campo]
                    : pedidoActual[campo];
        });

        pedidoModel.actualizarPedido(id, datosActualizados, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({
                message: 'Pedido actualizado correctamente'
            });
        });
    });
},


    // ELIMINAR UN PEDIDO
    eliminarPedido: (req, res) => {
        const { id } = req.params;

        pedidoModel.eliminarPedido(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Pedido no encontrado'
                });
            }

            res.status(200).json({
                message: 'Pedido eliminado correctamente'
            });
        });
    }

};
