import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { ProductManager } from './contenedor/clases.js';
import { rutaProducto } from './rutas/productos.js';
import { rutaCarrito } from './rutas/carrito.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const aplicacion = express();
const port = process.env.PORT || 8080;
const server = createServer(aplicacion);
const io = new Server(server);
const productos = new ProductManager('src/db/productos.json');

//Motor de Plantilla
aplicacion.engine('handlebars', handlebars.engine({
    extname: "handlebars",
    defaultLayout: "main.handlebars",
    layoutsDir: __dirname + "/views"
}));
aplicacion.set('view engine', 'handlebars');
aplicacion.set('views', './src/views');

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
const servidor = server.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  const emitProductList = async () => {
    try {
      const products = await productos.getProducts();
      socket.emit('productList', products);
    } catch (error) {
      console.log('Error al obtener los productos:', error);
    }
  };

  emitProductList();

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

});