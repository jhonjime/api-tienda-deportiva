
const db = require('../config/dbConfig');

class Variante {

    // CONSULTAR TODAS LAS VARIANTES
    getVariantes(callback) {
        const sql = `
            SELECT
                id_variante,
                id_producto,
                sku,
                talla,
                color,
                precio,
                stock,
                activo,
                created_at,
                updated_at
            FROM variantes
        `;

        db.query(sql, callback);
    }

    // CONSULTAR VARIANTE POR ID
    getVarianteById(id, callback) {
        const sql = `
            SELECT
                id_variante,
                id_producto,
                sku,
                talla,
                color,
                precio,
                stock,
                activo,
                created_at,
                updated_at
            FROM variantes
            WHERE id_variante = ?
        `;

        db.query(sql, [id], callback);
    }

    // CREAR VARIANTE
    crearVariante(datos, callback) {
        const sql = `
            INSERT INTO variantes
            (id_producto, sku, talla, color, precio, stock, activo)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            datos.id_producto,
            datos.sku,
            datos.talla,
            datos.color,
            datos.precio,
            datos.stock !== undefined ? datos.stock : 0,
            datos.activo !== undefined ? datos.activo : 1
        ], callback);
    }

    // ACTUALIZAR VARIANTE
    actualizarVariante(id, datos, callback) {
        const sql = `
            UPDATE variantes
            SET id_producto = ?,
                sku = ?,
                talla = ?,
                color = ?,
                precio = ?,
                stock = ?,
                activo = ?
            WHERE id_variante = ?
        `;

        db.query(sql, [
            datos.id_producto,
            datos.sku,
            datos.talla,
            datos.color,
            datos.precio,
            datos.stock,
            datos.activo,
            id
        ], callback);
    }

    // ELIMINAR VARIANTE
    eliminarVariante(id, callback) {
        const sql = `
            DELETE FROM variantes
            WHERE id_variante = ?
        `;

        db.query(sql, [id], callback);
    }

}

module.exports = new Variante();
