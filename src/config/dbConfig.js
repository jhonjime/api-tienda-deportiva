
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'bghav8clbq79hvzl57x4-mysql.services.clever-cloud.com',
    user: 'u51kbv1zowcvy3bo',
    password: 'H17ZrLa3S4m6ZJ1lNEWQ',
    database: 'bghav8clbq79hvzl57x4',
    port: 3306,
    connectTimeout: 60000
});

// CONECTAR A MYSQL
db.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
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
