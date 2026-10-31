
const db = require('../config/dbConfig');

class Producto {

    // CONSULTAR TODOS LOS PRODUCTOS
    getProductos(callback) {
        const sql = `
            SELECT
                id_producto,
                nombre,
                categoria,
                marca,
                genero,
                precio_base,
                activo,
                created_at,
                updated_at
            FROM productos
        `;

        db.query(sql, callback);
    }

    // CONSULTAR UN PRODUCTO POR ID
    getProductoById(id, callback) {
        const sql = `
            SELECT
                id_producto,
                nombre,
                categoria,
                marca,
                genero,
                precio_base,
                activo,
                created_at,
                updated_at
            FROM productos
            WHERE id_producto = ?
        `;

        db.query(sql, [id], callback);
    }

    // CREAR UN PRODUCTO
    crearProducto(datos, callback) {
        const sql = `
            INSERT INTO productos
            (nombre, categoria, marca, genero, precio_base, activo)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            datos.nombre,
            datos.categoria,
            datos.marca,
            datos.genero || 'unisex',
            datos.precio_base,
            datos.activo !== undefined ? datos.activo : 1
        ], callback);
    }

    // ACTUALIZAR UN PRODUCTO
    actualizarProducto(id, datos, callback) {
        const sql = `
            UPDATE productos
            SET nombre = ?,
                categoria = ?,
                marca = ?,
                genero = ?,
                precio_base = ?,
                activo = ?
            WHERE id_producto = ?
        `;

        db.query(sql, [
            datos.nombre,
            datos.categoria,
            datos.marca,
            datos.genero,
            datos.precio_base,
            datos.activo,
            id
        ], callback);
    }

    // ELIMINAR UN PRODUCTO
    eliminarProducto(id, callback) {
        const sql = `
            DELETE FROM productos
            WHERE id_producto = ?
        `;

        db.query(sql, [id], callback);
    }

}

module.exports = new Producto();
