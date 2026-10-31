
const varianteModel = require('../models/varianteModel');

module.exports = {

    // CONSULTAR TODAS LAS VARIANTES
    getVariantes: (req, res) => {
        varianteModel.getVariantes((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({ data: result });
        });
    },

    // CONSULTAR VARIANTE POR ID
    getVarianteById: (req, res) => {
        const { id } = req.params;

        varianteModel.getVarianteById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Variante no encontrada'
                });
            }

            res.status(200).json({ data: result[0] });
        });
    },

    // CREAR VARIANTE
    crearVariante: (req, res) => {
        const datos = req.body || {};

        const camposObligatorios = [
            'id_producto',
            'sku',
            'talla',
            'color'
        ];

        for (const campo of camposObligatorios) {
            if (
                datos[campo] === undefined ||
                datos[campo] === null ||
                datos[campo] === ''
            ) {
                return res.status(400).json({
                    error: `El campo ${campo} es obligatorio`
                });
            }
        }

        if (
            !Number.isInteger(Number(datos.id_producto)) ||
            Number(datos.id_producto) <= 0
        ) {
            return res.status(400).json({
                error: 'El ID del producto debe ser un número entero positivo'
            });
        }

        if (
            typeof datos.sku !== 'string' ||
            datos.sku.trim() === '' ||
            datos.sku.length > 40
        ) {
            return res.status(400).json({
                error: 'El SKU es obligatorio y no puede superar 40 caracteres'
            });
        }

        if (
            typeof datos.talla !== 'string' ||
            datos.talla.trim() === '' ||
            datos.talla.length > 20
        ) {
            return res.status(400).json({
                error: 'La talla es obligatoria y no puede superar 20 caracteres'
            });
        }

        if (
            typeof datos.color !== 'string' ||
            datos.color.trim() === '' ||
            datos.color.length > 40
        ) {
            return res.status(400).json({
                error: 'El color es obligatorio y no puede superar 40 caracteres'
            });
        }

        if (
            datos.precio !== undefined &&
            datos.precio !== null &&
            (!Number.isFinite(Number(datos.precio)) || Number(datos.precio) < 0)
        ) {
            return res.status(400).json({
                error: 'El precio debe ser un número mayor o igual a cero, o NULL'
            });
        }

        const stock = datos.stock !== undefined ? Number(datos.stock) : 0;

        if (!Number.isInteger(stock) || stock < 0) {
            return res.status(400).json({
                error: 'El stock debe ser un número entero mayor o igual a cero'
            });
        }

        if (
            datos.activo !== undefined &&
            ![0, 1, true, false].includes(datos.activo)
        ) {
            return res.status(400).json({
                error: 'El campo activo debe ser 0, 1, true o false'
            });
        }

        varianteModel.crearVariante({
            ...datos,
            stock,
            precio: datos.precio !== undefined ? datos.precio : null
        }, (err, result) => {

            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        error: 'El SKU ya está registrado'
                    });
                }

                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).json({
                        error: 'El producto indicado no existe'
                    });
                }

                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Variante creada correctamente',
                id_variante: result.insertId
            });
        });
    },

    // ACTUALIZAR VARIANTE
    actualizarVariante: (req, res) => {
        const { id } = req.params;
        const datos = req.body || {};

        varianteModel.getVarianteById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Variante no encontrada'
                });
            }

            const actual = result[0];

            const varianteActualizada = {
                id_producto: datos.id_producto ?? actual.id_producto,
                sku: datos.sku ?? actual.sku,
                talla: datos.talla ?? actual.talla,
                color: datos.color ?? actual.color,
                precio: datos.precio !== undefined ? datos.precio : actual.precio,
                stock: datos.stock ?? actual.stock,
                activo: datos.activo ?? actual.activo
            };

            if (
                !Number.isInteger(Number(varianteActualizada.id_producto)) ||
                Number(varianteActualizada.id_producto) <= 0
            ) {
                return res.status(400).json({
                    error: 'El ID del producto debe ser un número entero positivo'
                });
            }

            if (
                typeof varianteActualizada.sku !== 'string' ||
                varianteActualizada.sku.trim() === '' ||
                varianteActualizada.sku.length > 40
            ) {
                return res.status(400).json({
                    error: 'El SKU es obligatorio y no puede superar 40 caracteres'
                });
            }

            if (
                typeof varianteActualizada.talla !== 'string' ||
                varianteActualizada.talla.trim() === '' ||
                varianteActualizada.talla.length > 20
            ) {
                return res.status(400).json({
                    error: 'La talla es obligatoria y no puede superar 20 caracteres'
                });
            }

            if (
                typeof varianteActualizada.color !== 'string' ||
                varianteActualizada.color.trim() === '' ||
                varianteActualizada.color.length > 40
            ) {
                return res.status(400).json({
                    error: 'El color es obligatorio y no puede superar 40 caracteres'
                });
            }

            if (
                varianteActualizada.precio !== null &&
                (!Number.isFinite(Number(varianteActualizada.precio)) ||
                Number(varianteActualizada.precio) < 0)
            ) {
                return res.status(400).json({
                    error: 'El precio debe ser mayor o igual a cero, o NULL'
                });
            }

            const stock = Number(varianteActualizada.stock);

            if (!Number.isInteger(stock) || stock < 0) {
                return res.status(400).json({
                    error: 'El stock debe ser un número entero mayor o igual a cero'
                });
            }

            if (![0, 1, true, false].includes(varianteActualizada.activo)) {
                return res.status(400).json({
                    error: 'El campo activo debe ser 0, 1, true o false'
                });
            }

            varianteModel.actualizarVariante(
                id,
                {
                    ...varianteActualizada,
                    stock
                },
                (error, resultado) => {

                    if (error) {
                        if (error.code === 'ER_DUP_ENTRY') {
                            return res.status(409).json({
                                error: 'El SKU ya está registrado'
                            });
                        }

                        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                            return res.status(400).json({
                                error: 'El producto indicado no existe'
                            });
                        }

                        return res.status(500).json({
                            error: error.message
                        });
                    }

                    res.status(200).json({
                        message: 'Variante actualizada correctamente'
                    });
                }
            );
        });
    },

    // ELIMINAR VARIANTE
    eliminarVariante: (req, res) => {
        const { id } = req.params;

        varianteModel.eliminarVariante(id, (err, result) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(409).json({
                        error: 'No se puede eliminar la variante porque está asociada a un detalle de pedido'
                    });
                }

                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Variante no encontrada'
                });
            }

            res.status(200).json({
                message: 'Variante eliminada correctamente'
            });
        });
    }

};
