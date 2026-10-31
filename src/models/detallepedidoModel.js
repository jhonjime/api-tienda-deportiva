
const db = require('../config/dbConfig');

class DetallePedido {

    // CONSULTAR TODOS LOS DETALLES
    getDetalles(callback) {
        const sql = `
            SELECT
                id_detalle,
                id_pedido,
                id_variante,
                cantidad,
                precio_unitario,
                created_at,
                updated_at
            FROM detalle_pedido
        `;

        db.query(sql, callback);
    }

    // CONSULTAR UN DETALLE POR ID
    getDetalleById(id, callback) {
        const sql = `
            SELECT
                id_detalle,
                id_pedido,
                id_variante,
                cantidad,
                precio_unitario,
                created_at,
                updated_at
            FROM detalle_pedido
            WHERE id_detalle = ?
        `;

        db.query(sql, [id], callback);
    }

    // CREAR UN DETALLE
    crearDetalle(datos, callback) {
        const sql = `
            INSERT INTO detalle_pedido
            (id_pedido, id_variante, cantidad, precio_unitario)
            VALUES (?, ?, ?, ?)
        `;

        const valores = [
            datos.id_pedido,
            datos.id_variante,
            datos.cantidad,
            datos.precio_unitario
        ];

        db.query(sql, valores, callback);
    }

    // ACTUALIZAR UN DETALLE
    actualizarDetalle(id, datos, callback) {
        const sql = `
            UPDATE detalle_pedido
            SET id_pedido = ?,
                id_variante = ?,
                cantidad = ?,
                precio_unitario = ?
            WHERE id_detalle = ?
        `;

        const valores = [
            datos.id_pedido,
            datos.id_variante,
            datos.cantidad,
            datos.precio_unitario,
            id
        ];

        db.query(sql, valores, callback);
    }

    // ELIMINAR UN DETALLE
    eliminarDetalle(id, callback) {
        const sql = `
            DELETE FROM detalle_pedido
            WHERE id_detalle = ?
        `;

        db.query(sql, [id], callback);
    }
}

module.exports = new DetallePedido();
