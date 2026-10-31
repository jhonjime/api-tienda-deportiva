
const express = require('express');
const bodyParser = require('body-parser');

// Cargar las 6 rutas de las tablas
const clienteRoutes = require('./src/routes/clienteRoutes');
const productoRoutes = require('./src/routes/productoRoutes');
const varianteRoutes = require('./src/routes/varianteRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');
const detallePedidoRoutes = require('./src/routes/detallepedidoRoutes');
const pagoRoutes = require('./src/routes/pagoRoutes');

const app = express();

// Render asigna el puerto automáticamente
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());

// Ruta principal para comprobar que la API funciona
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de la tienda deportiva funcionando correctamente',
        estado: 'Online',
        modulos: [
            'Clientes',
            'Productos',
            'Variantes',
            'Pedidos',
            'Detalles de pedidos',
            'Pagos'
        ]
    });
});

// RUTAS DE LA API
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/variantes', varianteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/detalles', detallePedidoRoutes);
app.use('/api/pagos', pagoRoutes);

// INICIAR EL SERVIDOR
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
