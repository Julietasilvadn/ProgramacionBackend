import express from 'express';
import { rutaProducto } from './rutas/productos.js';
import { rutaCarrito } from './rutas/carrito.js';
const aplicacion = express();
const port = process.env.PORT || 8080;

//JSON
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

//RUTAS
aplicacion.use('/api/products', rutaProducto);
aplicacion.use('/api/carts', rutaCarrito);

//MIDLEWARE
aplicacion.use((peticion, respuesta, next) => {
  if (!peticion.route) {
    respuesta.status(404).send({ error : -2, descripcion: `ruta ${peticion.url} no encontrada` });
  } else {
    next();
  }
})

//SERVIDOR
const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));
