// CLASE --------------------------------------------------------------------------------------------------------------------------------

class ProductManager {
    constructor() {
      this.products = [];
      this.lastProductId = 0;
    }

    generateCode() {
        this.lastProductId++;
        return this.lastProductId;
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(title, description, price, thumbnail, stock) {
      const code = this.generateCode();
      const product = { code, title, description, price, thumbnail, stock };
      this.products.push(product);
      return product;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.code === id); 
      if (product) {
        return product;
      } else {
        console.error("Not found");
      }
    }
  }
  
// AGREGAR PRODUCTOS --------------------------------------------------------------------------------------------------------------------

const productManager = new ProductManager();
  
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", 25);
productManager.addProduct("otro producto", "Este es otro producto de prueba", 150, "sin imagen", 10);

// BUSCAR TODOS LOS PRODUCTOS -----------------------------------------------------------------------------------------------------------

const allProducts = productManager.getProducts();
console.log("Todos, los productos son: ", allProducts)

// BUSCAR PRODUCTO EXISTENTE ------------------------------------------------------------------------------------------------------------
  
const product = productManager.getProductById(1);
console.log("El producto es: ", product);
  
// BUSCAR PRODUCTO INEXISTENTE ----------------------------------------------------------------------------------------------------------

const nonexistentProduct = productManager.getProductById(3);
  