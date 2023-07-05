import express from "express";
import { ProductManager } from "../contenedor/clases.js";
const rutaProducto = express.Router();

const productos = new ProductManager('src/db/productos.json');

//ENDPOINTS ----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Funciona
rutaProducto.get('/',async (req,res)=>{
    let limit = parseInt(req.query.limit);
    let products;
    if(!limit){
        const data1 = JSON.stringify(await productos.getProducts());
        products = JSON.parse(data1)
        res.setHeader('Content-Type', 'application/json')
        res.send( JSON.stringify(await products, null,2));
    } else{
        const data = JSON.stringify(await productos.getProducts());
        products = JSON.parse(data)
        res.setHeader('Content-Type', 'application/json')
        await res.send(JSON.stringify(products.slice(0, limit), null, 2));
    }
        
})

//Funciona
rutaProducto.get('/:pid', async (req,res)=>{
    let idProduct = parseInt(req.params.pid)
    const product = await productos.getProductById(idProduct)
    if(!product){
        respuesta.status(404);
        respuesta.json({ error : 'producto no encontrado' });
    } else {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(product, null, 2));
    }

    
})

//Funciona 
rutaProducto.post('/', async (req,res)=>{
    const producto = req.body;
    await productos.addProduct(producto.title, producto.description, producto.price, producto.thumbnail, producto.stock);
    await productos.saveProduct();
    res.send(producto)
})

//Funciona
rutaProducto.put('/:pid',async (req,res)=>{
    const id = parseInt(req.params.pid);
    const producto = req.body;
    await productos.updateProduct(id,producto)
    res.json(producto);
})


//Funciona
rutaProducto.delete('/:pid',async(req,res)=>{
    const id = parseInt(req.params.pid);
    const deletedProduct = await productos.getProductById(id);
    await productos.deleteProduct(id);
    if (deletedProduct) {
        res.json({ status: 'Producto borrado', producto: deletedProduct });
    } else {
        res.json({ error: 'ID de producto no encontrado' });
    }
    
})

export { rutaProducto }