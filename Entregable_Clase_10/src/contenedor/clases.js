import * as fs from 'fs';

// CLASE --------------------------------------------------------------------------------------------------------------------------------

export class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = [];
      this.lastProductId = 0;
      this.loadProducts();
    }

    async loadProducts() {
        try {
          const data = await fs.readFileSync(this.path);
          this.products = JSON.parse(data);
          this.lastProductId = this.products.reduce((maxId, product) => Math.max(maxId, product.code), 0);
        } catch (error) {
          this.products = [];
          this.lastProductId = 0;
        }
    }

    generateCode() {
        this.lastProductId++;
        return this.lastProductId.toString();
    }

    async saveProduct(){
        try{
            await fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
        } catch(err){
            console.log('Error al guardar', err)
        }
    }
  
    async getProducts() {
        try {
            return await this.products;
        } catch (err) {
            console.log('Error al buscar productos', err)
        }
    }
  
    async addProduct(title, description, price, thumbnail, stock) {
        try {
            const code = parseInt(this.generateCode());
            const product = { code, title, description, price, thumbnail, stock };
            await this.products.push(product);
            await this.saveProduct();
            return product;
        } catch (err) {
            console.log('Error al agregar producto', err)
        }
    }
  
    async getProductById(id) {
        try {
            const product = await this.products.find(p => p.code === id); 
            if (product) {
                return product;
            } else {
                console.log("Producto no encontrado");
            }
        } catch (err) {
            console.log('Error al buscar producto', err)
        }
    }

    async deleteProduct(id){
        try {
            const product = await this.products.findIndex(p => p.code === id);
            if (product !== -1) {
                this.products.splice(product,1);
                await this.saveProduct();
                console.log(`El producto con el id ${id} fue borrado`)
            } else {
                console.log(`No se encontró ningún producto con el ID ${id}`)
            }
        } catch (err) {
            console.log('Error al borrar producto', err)
        }

    }

    async updateProduct(id, update){
        try {
            const product = await this.products.findIndex(p => p.code === id);
            if (product !== -1) {
                const updatedProduct = await Object.assign({}, this.products[product], update);
                this.products[product] = await updatedProduct;
                await this.saveProduct();
                console.log(`El producto con el id ${id} fue actualizado`);
                return await updatedProduct;
              }
        } catch (err) {
            console.log('Error al editar producto', err)
        }

    }
}
  
export class CartManager {
    constructor(path) {
      this.path = path;
      this.carts = [];
      this.lastCartId = 0;
      this.loadCarts();
    }
  
    async loadCarts() {
      try {
        const data = await fs.readFileSync(this.path);
        this.carts = JSON.parse(data);
        this.lastCartId = this.carts.reduce((maxId, cart) => Math.max(maxId, cart.id), 0);
      } catch (error) {
        this.carts = [];
        this.lastCartId = 0;
      }
    }
  
    generateCartId() {
      this.lastCartId++;
      return this.lastCartId.toString();
    }
  
    async saveCarts() {
      try {
        await fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
      } catch (error) {
        console.log('Error al guardar los carritos', error);
      }
    }
  
    async getCartById(cartId) {
      try {
        const cart = this.carts.find(c => c.id === cartId);
        return cart;
      } catch (error) {
        console.log('Error al obtener el carrito', error);
      }
    }
  
    async createCart() {
      try {
        const cart = {
          id: parseInt(this.generateCartId()),
          products: []
        };
        this.carts.push(cart);
        await this.saveCarts();
        return cart;
      } catch (error) {
        console.log('Error al crear el carrito', error);
      }
    }
  
    async addProductToCart(cartId, productId) {
      try {
        const cart = await this.getCartById(cartId);
        if (cart) {
          const existingProduct = cart.products.find(product => product.product === productId);
          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            cart.products.push({ product: productId, quantity: 1 });
          }
          await this.saveCarts();
          return cart;
        } else {
          console.log('Carrito no encontrado');
        }
      } catch (error) {
        console.log('Error al agregar el producto al carrito', error);
      }
    }
  }