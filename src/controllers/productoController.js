
const productoModel = require('../models/productoModel');

const generosPermitidos = ['hombre', 'mujer', 'unisex', 'infantil'];

module.exports = {

    // CONSULTAR TODOS LOS PRODUCTOS
    getProductos: (req, res) => {
        productoModel.getProductos((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({ data: result });
        });
    },

    // CONSULTAR PRODUCTO POR ID
    getProductoById: (req, res) => {
        const { id } = req.params;

        productoModel.getProductoById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Producto no encontrado'
                });
            }

            res.status(200).json({ data: result[0] });
        });
    },

    // CREAR PRODUCTO
    crearProducto: (req, res) => {
        const datos = req.body || {};

        const camposObligatorios = [
            'nombre',
            'categoria',
            'marca',
            'precio_base'
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
            datos.genero !== undefined &&
            !generosPermitidos.includes(datos.genero)
        ) {
            return res.status(400).json({
                error: 'El género debe ser hombre, mujer, unisex o infantil'
            });
        }

        const precio = Number(datos.precio_base);

        if (!Number.isFinite(precio) || precio < 0) {
            return res.status(400).json({
                error: 'El precio base debe ser un número mayor o igual a cero'
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

        productoModel.crearProducto(datos, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Producto creado correctamente',
                id_producto: result.insertId
            });
        });
    },

    // ACTUALIZAR PRODUCTO
    actualizarProducto: (req, res) => {
        const { id } = req.params;
        const datos = req.body || {};

        productoModel.getProductoById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Producto no encontrado'
                });
            }

            const actual = result[0];

            const productoActualizado = {
                nombre: datos.nombre ?? actual.nombre,
                categoria: datos.categoria ?? actual.categoria,
                marca: datos.marca ?? actual.marca,
                genero: datos.genero ?? actual.genero,
                precio_base: datos.precio_base ?? actual.precio_base,
                activo: datos.activo ?? actual.activo
            };

            for (const campo of ['nombre', 'categoria', 'marca']) {
                if (
                    typeof productoActualizado[campo] !== 'string' ||
                    productoActualizado[campo].trim() === ''
                ) {
                    return res.status(400).json({
                        error: `El campo ${campo} no puede estar vacío`
                    });
                }
            }

            if (!generosPermitidos.includes(productoActualizado.genero)) {
                return res.status(400).json({
                    error: 'El género debe ser hombre, mujer, unisex o infantil'
                });
            }

            const precio = Number(productoActualizado.precio_base);

            if (!Number.isFinite(precio) || precio < 0) {
                return res.status(400).json({
                    error: 'El precio base debe ser un número mayor o igual a cero'
                });
            }

            if (![0, 1, true, false].includes(productoActualizado.activo)) {
                return res.status(400).json({
                    error: 'El campo activo debe ser 0, 1, true o false'
                });
            }

            productoModel.actualizarProducto(
                id,
                productoActualizado,
                (error, resultado) => {
                    if (error) {
                        return res.status(500).json({
                            error: error.message
                        });
                    }

                    res.status(200).json({
                        message: 'Producto actualizado correctamente'
                    });
                }
            );
        });
    },

    // ELIMINAR PRODUCTO
    eliminarProducto: (req, res) => {
        const { id } = req.params;

        productoModel.eliminarProducto(id, (err, result) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(409).json({
                        error: 'No se puede eliminar el producto porque tiene variantes asociadas'
                    });
                }

                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Producto no encontrado'
                });
            }

            res.status(200).json({
                message: 'Producto eliminado correctamente'
            });
        });
    }

};
