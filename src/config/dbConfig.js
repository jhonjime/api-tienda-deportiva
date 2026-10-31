
require('dotenv').config();

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: Number(process.env.MYSQL_ADDON_PORT) || 3306,
    connectTimeout: 60000
});

// CONECTAR A MYSQL
db.connect((err) => {
    if (err) {
        console.error('Error de conexión MYSQL:', err);
        return;
    }

    console.log('Conexión MYSQL exitosa');

    // CONSULTAR VERSIÓN DE MYSQL
    db.query('SELECT VERSION() AS version', (error, resultados) => {
        if (error) {
            console.error('Error consultando MySQL:', error.message);
            return;
        }

        console.log('Versión del servidor:', resultados[0].version);
    });

    // COMPROBAR BASE DE DATOS Y SERVIDOR
    db.query(
        'SELECT DATABASE() AS base_actual, @@hostname AS servidor',
        (error, resultados) => {
            if (error) {
                console.error('Error comprobando la base de datos:', error.message);
                return;
            }

            console.log('Base de datos:', resultados[0].base_actual);
            console.log('Servidor:', resultados[0].servidor);
        }
    );
});

// EXPORTAR CONEXIÓN
module.exports = db;
