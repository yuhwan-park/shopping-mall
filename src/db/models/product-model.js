import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  async findByName(name) {
    const product = await Product.findOne({ name });
    return product;
  }

  async findById(shortId) {
    const product = await Product.findOne({ shortId });
    return product;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAll() {
    const products = await Product.find({});
    return products;
  }

  async update({ shortId, update }) {
    const filter = { shortId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedProduct;
  }

  async delete(shortId) {
    const product = await Product.findOneAndDelete({ shortId });
    return product;
  }
}

const productModel = new ProductModel();

export { productModel };
