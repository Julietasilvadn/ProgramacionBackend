import express from "express";
import { ProductManager } from "../contenedor/clases.js";
const rutaCarrito = express.Router();

const carritos = new ProductManager('src/db/carritos.json')
const productos = new ProductManager('src/db/productos.json');

//ENDPOINTS ----------------------------------------------------------------------------------------------------------------------------------------------------------------

rutaCarrito.get('/:cid', async(req, res)=>{
    const idCarrito = parseInt(req.params.cid);
    const carrito = await carritos.getProductById(idCarrito)
    if(carrito){
        res.json(carrito.products)
    } else {
        res.json({ error: 'Carrito no encontrado' })
    }
    
});

rutaCarrito.post('/', async(req,res)=>{
    const carrito = {
        id: parseInt(carritos.generateCode()),
        date: Date.now(),
        productos: []
      };
    res.json(carrito);
})

//rutaCarrito.post('/:cid/product/:pid', async(req,res)=>{
//    const idCarrito = parseInt(req.params.cid)
//    const idProducto = parseInt(req.params.pid)
//})





export { rutaCarrito }