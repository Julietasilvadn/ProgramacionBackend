const fs = require("fs");

// CLASE --------------------------------------------------------------------------------------------------------------------------------

class ProductManager {
  constructor(filename) {
    this.filename = filename;
    this.products = [];
    this.lastProductId = 0;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filename);
      this.products = JSON.parse(data);
      this.lastProductId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
    } catch (error) {
      this.products = [];
      this.lastProductId = 0;
    }
  }

  saveProducts() {
    fs.writeFileSync(this.filename, JSON.stringify(this.products, null, 2));
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, stock) {
    const id = this.lastProductId + 1;
    const product = { id, title, description, price, thumbnail, stock };
    this.products.push(product);
    this.lastProductId = id;
    this.saveProducts();
    return product;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return product;
    } else {
      console.error("Product not found");
    }
  }

  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedProduct = Object.assign({}, this.products[index], updates);
      this.products[index] = updatedProduct;
      this.saveProducts();
      console.log(`El producto con el id ${id} fue actualizado`);
      return updatedProduct;
    } else {
      console.error("Product not found");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      console.log(`El producto con el id ${id} fue borrado`);
    } else {
      console.error("Product not found");
    }
  }
}

// AGREGAR PRODUCTOS --------------------------------------------------------------------------------------------------------------------

const productManager = new ProductManager("products.json");

productManager.addProduct("producto prueba 1", "Este es un producto prueba 1", 200, "sin imagen", 25);
productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 300, "sin imagen", 10);
productManager.addProduct("producto prueba 3", "Este es un producto prueba 3", 400, "sin imagen", 50);
productManager.addProduct("producto prueba 4", "Este es un producto prueba 4", 500, "sin imagen", 36);

// MOSTRAR TODOS LOS PRODUCTOS -----------------------------------------------------------------------------------------------------------

const allProducts = productManager.getProducts();
console.log("Todos, los productos son: ", allProducts)

// BUSCAR PRODUCTO EXISTENTE ------------------------------------------------------------------------------------------------------------
  
const product = productManager.getProductById(1);
console.log("El producto es: ", product);
  
// BUSCAR PRODUCTO INEXISTENTE ----------------------------------------------------------------------------------------------------------

const nonexistentProduct = productManager.getProductById(3);

// ACTUALIZAR UN PRODUCTO ---------------------------------------------------------------------------------------------------------------

productManager.updateProduct(1, { title: "producto prueba actualizado", price: 250 });

// ELIMINAR UN PRODUCTO -----------------------------------------------------------------------------------------------------------------

productManager.deleteProduct(2);

// MOSTRAR TODOS LOS PRODUCTOS -----------------------------------------------------------------------------------------------------------

console.log("Todos, los productos son: ", allProducts)

