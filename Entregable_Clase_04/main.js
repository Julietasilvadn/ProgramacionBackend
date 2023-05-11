const fs = require('fs')

// CLASE --------------------------------------------------------------------------------------------------------------------------------

class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = [];
      this.lastProductId = 0;
      this.loadProducts();
    }

    loadProducts() {
        try {
          const data = fs.readFileSync(this.path);
          this.products = JSON.parse(data);
          this.lastProductId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        } catch (error) {
          this.products = [];
          this.lastProductId = 0;
        }
    }

    saveProduct(){
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
        } catch(err){
            console.log('Error al guardar', err)
        }
    }

    generateCode() {
        this.lastProductId++;
        return this.lastProductId;
    }
  
    getProducts() {
        try {
            return this.products;
        } catch (err) {
            console.log('Error al buscar productos', err)
        }
    }
  
    addProduct(title, description, price, thumbnail, stock) {
        try {
            const code = this.generateCode();
            const product = { code, title, description, price, thumbnail, stock };
            this.products.push(product);
            this.saveProduct;
            return product;
        } catch (err) {
            console.log('Error al agregar producto', err)
        }
    }
  
    getProductById(id) {
        try {
            const product = this.products.find(p => p.code === id); 
            if (product) {
                return product;
            } else {
                console.log("Producto no encontrado");
            }
        } catch (err) {
            console.log('Error al buscar producto', err)
        }
    }

    deleteProduct(id){
        try {
            const product = this.products.findIndex(p => p.code === id);
            this.products.splice(product,1);
            this.saveProduct();
            console.log(`El producto con el id ${id} fue borrado`)
            
        } catch (err) {
            console.log('Error al borrar producto', err)
        }

    }

    updateProduct(id, update){
        try {
            const product = this.products.findIndex(p => p.code === id);
            if (product !== -1) {
                const updatedProduct = Object.assign({}, this.products[product], update);
                this.products[product] = updatedProduct;
                this.saveProduct();
                console.log(`El producto con el id ${id} fue actualizado`);
                return updatedProduct;
              }
        } catch (err) {
            console.log('Error al editar producto', err)
        }

    }
  }
  
  
// PRUEBAS ------------------------------------------------------------------------------------------------------------------------------

// AGREGAR PRODUCTOS --------------------------------------------------------------------------------------------------------------------

const productManager = new ProductManager("products.json");
  
productManager.addProduct("producto 1", "Este es el producto de prueba 1", 100, "sin imagen", 10);
productManager.addProduct("producto 2", "Este es el producto de prueba 2", 150, "sin imagen", 15);
productManager.addProduct("producto 3", "Este es el producto de prueba 3", 200, "sin imagen", 20);
productManager.addProduct("producto 4", "Este es el producto de prueba 4", 250, "sin imagen", 25);
productManager.addProduct("producto 5", "Este es el producto de prueba 5", 300, "sin imagen", 30);
productManager.addProduct("producto 6", "Este es el producto de prueba 6", 350, "sin imagen", 35);


// BUSCAR TODOS LOS PRODUCTOS -----------------------------------------------------------------------------------------------------------

const allProducts = productManager.getProducts();
console.log("Todos, los productos son: ", allProducts)

// BUSCAR PRODUCTO EXISTENTE ------------------------------------------------------------------------------------------------------------
  
const product = productManager.getProductById(1);
console.log("El producto es: ", product);
  
// ELIMINAR PRODUCTO EXISTENTE ----------------------------------------------------------------------------------------------------------

productManager.deleteProduct(2);
console.log("Todos los productos restantes son: ", allProducts)

// // EDITAR PRODUCTO EXISTENTE ------------------------------------------------------------------------------------------------------------

const newUpdateProduct = productManager.updateProduct(1, {title: "producto con el titulo editado", thumbnail: "sin imagen pero editado"})
const productModificado = productManager.getProductById(1);
console.log("El producto modificado es: ", productModificado);
