
const db = require('../config/dbConfig');

class Pago {

    // CONSULTAR TODOS LOS PAGOS
    getPagos(callback) {
        const sql = `
            SELECT
                id_pago,
                id_pedido,
                metodo,
                monto,
                estado,
                referencia,
                fecha,
                created_at,
                updated_at
            FROM pagos
        `;

        db.query(sql, callback);
    }

    // CONSULTAR UN PAGO POR ID
    getPagoById(id, callback) {
        const sql = `
            SELECT
                id_pago,
                id_pedido,
                metodo,
                monto,
                estado,
                referencia,
                fecha,
                created_at,
                updated_at
            FROM pagos
            WHERE id_pago = ?
        `;

        db.query(sql, [id], callback);
    }

    // CREAR UN PAGO
    crearPago(datos, callback) {
        const sql = `
            INSERT INTO pagos
            (id_pedido, metodo, monto, estado, referencia, fecha)
            VALUES (?, ?, ?, COALESCE(?, 'pendiente'),
                    ?, COALESCE(?, CURRENT_TIMESTAMP))
        `;

        const valores = [
            datos.id_pedido,
            datos.metodo,
            datos.monto,
            datos.estado || null,
            datos.referencia,
            datos.fecha || null
        ];

        db.query(sql, valores, callback);
    }

    // ACTUALIZAR UN PAGO
    actualizarPago(id, datos, callback) {
        const sql = `
            UPDATE pagos
            SET id_pedido = ?,
                metodo = ?,
                monto = ?,
                estado = ?,
                referencia = ?,
                fecha = ?
            WHERE id_pago = ?
        `;

        const valores = [
            datos.id_pedido,
            datos.metodo,
            datos.monto,
            datos.estado,
            datos.referencia,
            datos.fecha,
            id
        ];

        db.query(sql, valores, callback);
    }

    // ELIMINAR UN PAGO
    eliminarPago(id, callback) {
        const sql = `
            DELETE FROM pagos
            WHERE id_pago = ?
        `;

        db.query(sql, [id], callback);
    }
}

module.exports = new Pago();
