
const pagoModel = require('../models/pagoModel');

const metodosPermitidos = [
    'efectivo',
    'tarjeta_credito',
    'tarjeta_debito',
    'pse',
    'nequi',
    'daviplata'
];

const estadosPermitidos = [
    'pendiente',
    'aprobado',
    'rechazado',
    'reembolsado'
];

module.exports = {

    // CONSULTAR TODOS LOS PAGOS
    getPagos: (req, res) => {
        pagoModel.getPagos((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({ data: result });
        });
    },

    // CONSULTAR UN PAGO POR ID
    getPagoById: (req, res) => {
        const { id } = req.params;

        pagoModel.getPagoById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Pago no encontrado'
                });
            }

            res.status(200).json({ data: result });
        });
    },

    // CREAR UN PAGO
    crearPago: (req, res) => {
        const datos = req.body || {};

        if (
            datos.id_pedido === undefined ||
            !datos.metodo ||
            datos.monto === undefined ||
            !datos.referencia
        ) {
            return res.status(400).json({
                message: 'El ID del pedido, método, monto y referencia son obligatorios'
            });
        }

        if (
            !Number.isInteger(Number(datos.id_pedido)) ||
            Number(datos.id_pedido) <= 0
        ) {
            return res.status(400).json({
                message: 'El ID del pedido debe ser un número entero positivo'
            });
        }

        if (
            !Number.isFinite(Number(datos.monto)) ||
            Number(datos.monto) <= 0
        ) {
            return res.status(400).json({
                message: 'El monto debe ser un número mayor que cero'
            });
        }

        if (!metodosPermitidos.includes(datos.metodo)) {
            return res.status(400).json({
                message: 'El método de pago no es válido'
            });
        }

        if (
            datos.estado !== undefined &&
            !estadosPermitidos.includes(datos.estado)
        ) {
            return res.status(400).json({
                message: 'El estado del pago no es válido'
            });
        }

        pagoModel.crearPago(datos, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        message: 'La referencia del pago ya está registrada'
                    });
                }

                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).json({
                        message: 'El pedido indicado no existe'
                    });
                }

                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Pago creado correctamente',
                id_pago: result.insertId
            });
        });
    },

    // ACTUALIZAR UN PAGO
    actualizarPago: (req, res) => {
        const { id } = req.params;
        const datos = req.body || {};

        const campos = [
            'id_pedido',
            'metodo',
            'monto',
            'estado',
            'referencia',
            'fecha'
        ];

        if (Object.keys(datos).length === 0) {
            return res.status(400).json({
                message: 'Debes enviar al menos un campo para actualizar'
            });
        }

        pagoModel.getPagoById(id, (err, resultado) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    message: 'Pago no encontrado'
                });
            }

            const pagoActual = resultado[0];
            const datosActualizados = {};

            campos.forEach(campo => {
                datosActualizados[campo] =
                    datos[campo] !== undefined
                        ? datos[campo]
                        : pagoActual[campo];
            });

            if (
                !Number.isInteger(Number(datosActualizados.id_pedido)) ||
                Number(datosActualizados.id_pedido) <= 0
            ) {
                return res.status(400).json({
                    message: 'El ID del pedido debe ser un número entero positivo'
                });
            }

            if (!metodosPermitidos.includes(datosActualizados.metodo)) {
                return res.status(400).json({
                    message: 'El método de pago no es válido'
                });
            }

            if (
                !Number.isFinite(Number(datosActualizados.monto)) ||
                Number(datosActualizados.monto) <= 0
            ) {
                return res.status(400).json({
                    message: 'El monto debe ser un número mayor que cero'
                });
            }

            if (!estadosPermitidos.includes(datosActualizados.estado)) {
                return res.status(400).json({
                    message: 'El estado del pago no es válido'
                });
            }

            if (
                typeof datosActualizados.referencia !== 'string' ||
                datosActualizados.referencia.trim() === ''
            ) {
                return res.status(400).json({
                    message: 'La referencia del pago es obligatoria'
                });
            }

            pagoModel.actualizarPago(
                id,
                datosActualizados,
                (err, result) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            return res.status(409).json({
                                message: 'La referencia del pago ya está registrada'
                            });
                        }

                        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                            return res.status(400).json({
                                message: 'El pedido indicado no existe'
                            });
                        }

                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    res.status(200).json({
                        message: 'Pago actualizado correctamente'
                    });
                }
            );
        });
    },

    // ELIMINAR UN PAGO
    eliminarPago: (req, res) => {
        const { id } = req.params;

        pagoModel.eliminarPago(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Pago no encontrado'
                });
            }

            res.status(200).json({
                message: 'Pago eliminado correctamente'
            });
        });
    }
};
