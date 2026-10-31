
const db = require('../config/dbConfig');

class Pedido {

    // CONSULTAR TODOS LOS PEDIDOS
    getPedidos(callback) {
        const sql = `
            SELECT
                id_pedido,
                codigo,
                id_cliente,
                canal,
                fecha,
                estado,
                descuento,
                costo_envio,
                created_at,
                updated_at
            FROM pedidos
        `;

        db.query(sql, callback);
    }

    // CONSULTAR UN PEDIDO POR ID
    getPedidoById(id, callback) {
        const sql = `
            SELECT
                id_pedido,
                codigo,
                id_cliente,
                canal,
                fecha,
                estado,
                descuento,
                costo_envio,
                created_at,
                updated_at
            FROM pedidos
            WHERE id_pedido = ?
        `;

        db.query(sql, [id], callback);
    }

    // CREAR UN PEDIDO
    crearPedido(datos, callback) {
        const sql = `
            INSERT INTO pedidos
            (codigo, id_cliente, canal, fecha, estado, descuento, costo_envio)
            VALUES (?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP), ?, ?, ?)
        `;

        const valores = [
            datos.codigo,
            datos.id_cliente,
            datos.canal || 'online',
            datos.fecha || null,
            datos.estado || 'pendiente',
            datos.descuento ?? 0,
            datos.costo_envio ?? 0
        ];

        db.query(sql, valores, callback);
    }

    // ACTUALIZAR UN PEDIDO
    actualizarPedido(id, datos, callback) {
        const sql = `
            UPDATE pedidos
            SET codigo = ?,
                id_cliente = ?,
                canal = ?,
                fecha = ?,
                estado = ?,
                descuento = ?,
                costo_envio = ?
            WHERE id_pedido = ?
        `;

        const valores = [
            datos.codigo,
            datos.id_cliente,
            datos.canal,
            datos.fecha,
            datos.estado,
            datos.descuento,
            datos.costo_envio,
            id
        ];

        db.query(sql, valores, callback);
    }

    // ELIMINAR UN PEDIDO
    eliminarPedido(id, callback) {
        const sql = `
            DELETE FROM pedidos
            WHERE id_pedido = ?
        `;

        db.query(sql, [id], callback);
    }

}

module.exports = new Pedido();
