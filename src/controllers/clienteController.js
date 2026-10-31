
const clienteModel = require('../models/clienteModel');

const tiposDocumento = ['CC', 'CE', 'TI', 'PAS', 'NIT'];

module.exports = {

    // CONSULTAR TODOS LOS CLIENTES
    getClientes: (req, res) => {
        clienteModel.getClientes((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({ data: result });
        });
    },

    // CONSULTAR UN CLIENTE POR ID
    getClienteById: (req, res) => {
        const { id } = req.params;

        clienteModel.getClienteById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Cliente no encontrado'
                });
            }

            res.status(200).json({ data: result });
        });
    },

    // CREAR UN CLIENTE
    crearCliente: (req, res) => {
        const datos = req.body || {};

        const tipoDocumento = datos.tipo_documento || 'CC';

        if (
            !datos.numero_documento ||
            !datos.nombres ||
            !datos.apellidos ||
            !datos.email ||
            !datos.ciudad ||
            !datos.direccion
        ) {
            return res.status(400).json({
                message: 'El documento, nombres, apellidos, email, ciudad y dirección son obligatorios'
            });
        }

        if (!tiposDocumento.includes(tipoDocumento)) {
            return res.status(400).json({
                message: 'El tipo de documento no es válido'
            });
        }

        if (
            typeof datos.email !== 'string' ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)
        ) {
            return res.status(400).json({
                message: 'El correo electrónico no tiene un formato válido'
            });
        }

        const cliente = {
            tipo_documento: tipoDocumento,
            numero_documento: datos.numero_documento,
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            email: datos.email,
            telefono: datos.telefono || null,
            ciudad: datos.ciudad,
            direccion: datos.direccion
        };

        clienteModel.crearCliente(cliente, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        message: 'El documento o correo electrónico ya está registrado'
                    });
                }

                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Cliente creado correctamente',
                id_cliente: result.insertId
            });
        });
    },

    // ACTUALIZAR UN CLIENTE
    actualizarCliente: (req, res) => {
        const { id } = req.params;
        const datos = req.body || {};

        const campos = [
            'tipo_documento',
            'numero_documento',
            'nombres',
            'apellidos',
            'email',
            'telefono',
            'ciudad',
            'direccion'
        ];

        if (Object.keys(datos).length === 0) {
            return res.status(400).json({
                message: 'Debes enviar al menos un campo para actualizar'
            });
        }

        clienteModel.getClienteById(id, (err, resultado) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    message: 'Cliente no encontrado'
                });
            }

            const clienteActual = resultado[0];
            const clienteActualizado = {};

            campos.forEach(campo => {
                clienteActualizado[campo] =
                    datos[campo] !== undefined
                        ? datos[campo]
                        : clienteActual[campo];
            });

            if (
                !clienteActualizado.numero_documento ||
                !clienteActualizado.nombres ||
                !clienteActualizado.apellidos ||
                !clienteActualizado.email ||
                !clienteActualizado.ciudad ||
                !clienteActualizado.direccion
            ) {
                return res.status(400).json({
                    message: 'Los campos obligatorios no pueden estar vacíos'
                });
            }

            if (!tiposDocumento.includes(clienteActualizado.tipo_documento)) {
                return res.status(400).json({
                    message: 'El tipo de documento no es válido'
                });
            }

            if (
                typeof clienteActualizado.email !== 'string' ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clienteActualizado.email)
            ) {
                return res.status(400).json({
                    message: 'El correo electrónico no tiene un formato válido'
                });
            }

            clienteModel.actualizarCliente(
                id,
                clienteActualizado,
                (err, result) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            return res.status(409).json({
                                message: 'El documento o correo electrónico ya está registrado'
                            });
                        }

                        return res.status(500).json({ error: err.message });
                    }

                    res.status(200).json({
                        message: 'Cliente actualizado correctamente'
                    });
                }
            );
        });
    },

    // ELIMINAR UN CLIENTE
    eliminarCliente: (req, res) => {
        const { id } = req.params;

        clienteModel.eliminarCliente(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Cliente no encontrado'
                });
            }

            res.status(200).json({
                message: 'Cliente eliminado correctamente'
            });
        });
    }
};
