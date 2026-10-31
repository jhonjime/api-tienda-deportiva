
const db = require('../config/dbConfig');

class Cliente {

    // CONSULTAR TODOS LOS CLIENTES
   // CONSULTAR TODOS LOS CLIENTES
getClientes(callback) {
    const sql = `
        SELECT
            id_cliente,
            tipo_documento,
            numero_documento,
            nombres,
            apellidos,
            email,
            telefono,
            ciudad,
            direccion,
            fecha_registro,
            created_at,
            updated_at
        FROM clientes
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('ERROR SQL:', err.message);
            return callback(err, null);
        }

        callback(null, result);
    });
}
    // CONSULTAR UN CLIENTE POR ID
    getClienteById(id, callback) {
        const sql = `
            SELECT *
            FROM clientes
            WHERE id_cliente = ?
        `;

        db.query(sql, [id], callback);
    }

    // CREAR UN CLIENTE
    crearCliente(datos, callback) {
        const sql = `
            INSERT INTO clientes
            (tipo_documento, numero_documento, nombres, apellidos,
             email, telefono, ciudad, direccion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            datos.tipo_documento,
            datos.numero_documento,
            datos.nombres,
            datos.apellidos,
            datos.email,
            datos.telefono,
            datos.ciudad,
            datos.direccion
        ];

        db.query(sql, valores, callback);
    }

    // ACTUALIZAR UN CLIENTE
    actualizarCliente(id, datos, callback) {
        const sql = `
            UPDATE clientes
            SET tipo_documento = ?,
                numero_documento = ?,
                nombres = ?,
                apellidos = ?,
                email = ?,
                telefono = ?,
                ciudad = ?,
                direccion = ?
            WHERE id_cliente = ?
        `;

        const valores = [
            datos.tipo_documento,
            datos.numero_documento,
            datos.nombres,
            datos.apellidos,
            datos.email,
            datos.telefono,
            datos.ciudad,
            datos.direccion,
            id
        ];

        db.query(sql, valores, callback);
    }

    // ELIMINAR UN CLIENTE
    eliminarCliente(id, callback) {
        const sql = `
            DELETE FROM clientes
            WHERE id_cliente = ?
        `;

        db.query(sql, [id], callback);
    }
}

module.exports = new Cliente();
