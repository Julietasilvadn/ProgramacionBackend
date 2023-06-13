import express from "express";
import { ProductManager } from "../contenedor/clases.js";
import { CartManager } from "../contenedor/clases.js";
const rutaCarrito = express.Router();

const carritos = new CartManager('src/db/carritos.json')
const productos = new ProductManager('src/db/productos.json');

//ENDPOINTS ----------------------------------------------------------------------------------------------------------------------------------------------------------------

rutaCarrito.get('/:cid', async(req, res)=>{
    const idCarrito = parseInt(req.params.cid);
    const carrito = await carritos.getCartById(idCarrito)
    if(carrito){
        res.json(carrito.products)
    } else {
        res.json({ error: 'Carrito no encontrado' })
    }
    
});

rutaCarrito.post('/', async(req,res)=>{
    const carrito = await carritos.createCart();
    res.json(carrito);
})

rutaCarrito.post('/:cid/product/:pid', async(req,res)=>{
    const idCarrito = parseInt(req.params.cid);
    const idProducto = parseInt(req.params.pid);
    const carrito = await carritos.getCartById(idCarrito)

    if(!carrito){
        await carritos.createCart();
        await carritos.addProductToCart(idCarrito, idProducto);
        res.json(`Carrito con id ${idCarrito} creado y producto con id ${idProducto} agregado`)
    } else {
        await carritos.addProductToCart(idCarrito,idProducto);
        res.json(`Producto agregado al carrito ${idCarrito}`)
    }
})





export { rutaCarrito }