import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { rutaProducto } from './rutas/productos.js';
import { rutaCarrito } from './rutas/carrito.js';

const aplicacion = express();
const port = process.env.PORT || 8080;

//Motor de Plantilla
aplicacion.engine('handlebars', handlebars.engine());
aplicacion.set('views', __dirname + '/views');
aplicacion.set('view engine', 'handlebars');

//JSON
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));
aplicacion.use(express.static(__dirname + '/public'));

//RUTAS

aplicacion.use('/api/products', rutaProducto);
aplicacion.use('/api/carts', rutaCarrito);
aplicacion.use('/static', express.static(__dirname + '/public'));
aplicacion.get('/handle', (req, res)=>{
  let product={
    nombre: "Pan",
    precio: 222
  }
  res.render('home',product)
})

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
