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
          this.lastProductId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        } catch (error) {
          this.products = [];
          this.lastProductId = 0;
        }
    }

    generateCode() {
        this.lastProductId++;
        return this.lastProductId;
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
            const code = this.generateCode();
            const product = { code, title, description, price, thumbnail, stock };
            await this.products.push(product);
            await this.saveProduct;
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
            this.products.splice(product,1);
            await this.saveProduct();
            console.log(`El producto con el id ${id} fue borrado`)
            
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
  