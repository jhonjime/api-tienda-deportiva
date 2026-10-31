
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
const port = 3000;

app.use(bodyParser.json());

// RUTAS
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/variantes', varianteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/detalles', detallePedidoRoutes);
app.use('/api/pagos', pagoRoutes);

// INICIAR EL SERVIDOR
app.listen(port, () => {
    console.log("Servidor iniciado en http://localhost:" + port);
});
