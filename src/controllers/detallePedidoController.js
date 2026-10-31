
const detallePedidoModel = require('../models/detallepedidoModel');

module.exports = {

    // CONSULTAR TODOS LOS DETALLES
    getDetalles: (req, res) => {
        detallePedidoModel.getDetalles((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({ data: result });
        });
    },

    // CONSULTAR UN DETALLE
    getDetalleById: (req, res) => {
        const { id } = req.params;

        detallePedidoModel.getDetalleById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Detalle de pedido no encontrado'
                });
            }

            res.status(200).json({ data: result });
        });
    },

    // CREAR UN DETALLE
    crearDetalle: (req, res) => {
        const datos = req.body;

        if (
            datos.id_pedido === undefined ||
            datos.id_variante === undefined ||
            datos.cantidad === undefined ||
            datos.precio_unitario === undefined
        ) {
            return res.status(400).json({
                message: 'El ID del pedido, ID de la variante, cantidad y precio unitario son obligatorios'
            });
        }

        if (
            datos.cantidad <= 0 ||
            datos.precio_unitario < 0 ||
            !Number.isFinite(Number(datos.cantidad)) ||
            !Number.isFinite(Number(datos.precio_unitario))
        ) {
            return res.status(400).json({
                message: 'La cantidad debe ser mayor que cero y el precio no puede ser negativo'
            });
        }

        detallePedidoModel.crearDetalle(datos, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Detalle de pedido creado correctamente',
                id_detalle: result.insertId
            });
        });
    },

    // ACTUALIZAR UN DETALLE
    actualizarDetalle: (req, res) => {
        const { id } = req.params;
        const datos = req.body;

        const campos = [
            'id_pedido',
            'id_variante',
            'cantidad',
            'precio_unitario'
        ];

        if (Object.keys(datos).length === 0) {
            return res.status(400).json({
                message: 'Debes enviar al menos un campo para actualizar'
            });
        }

        detallePedidoModel.getDetalleById(id, (err, resultado) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    message: 'Detalle de pedido no encontrado'
                });
            }

            const detalleActual = resultado[0];
            const datosActualizados = {};

            campos.forEach(campo => {
                datosActualizados[campo] =
                    datos[campo] !== undefined
                        ? datos[campo]
                        : detalleActual[campo];
            });

            if (
                datosActualizados.cantidad <= 0 ||
                datosActualizados.precio_unitario < 0 ||
                !Number.isFinite(Number(datosActualizados.cantidad)) ||
                !Number.isFinite(Number(datosActualizados.precio_unitario))
            ) {
                return res.status(400).json({
                    message: 'La cantidad debe ser mayor que cero y el precio no puede ser negativo'
                });
            }

            detallePedidoModel.actualizarDetalle(
                id,
                datosActualizados,
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    res.status(200).json({
                        message: 'Detalle de pedido actualizado correctamente'
                    });
                }
            );
        });
    },

    // ELIMINAR UN DETALLE
    eliminarDetalle: (req, res) => {
        const { id } = req.params;

        detallePedidoModel.eliminarDetalle(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Detalle de pedido no encontrado'
                });
            }

            res.status(200).json({
                message: 'Detalle de pedido eliminado correctamente'
            });
        });
    }
};
