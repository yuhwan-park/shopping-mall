import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  async findOneByName(name) {
    const product = await Product.findOne({ name });
    return product;
  }

  async findOneByshortId(shortId) {
    const product = await Product.findOne({ shortId });
    return product;
  }

  async findAllByCategory(category) {
    const products = await Product.find({ category });
    return products;
  }

  async findAllBybrand(brand) {
    const products = await Product.find({ brand });
    return products;
  }

  async findAll() {
    const products = await Product.find({});
    return products;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
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
    const product = await Product.findOneAndDelete({ _id });
    return product;
  }
}

const productModel = new ProductModel();

export { productModel };
