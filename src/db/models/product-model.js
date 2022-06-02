import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  async findOneByName(name) {
    const product = await Product.findOne({ name });
    return product;
  }

  async findByName(filter) {
    const product = await Product.find({ name: { $regex: `${filter}` } });
    return product;
  }

  async findById(shortId) {
    const product = await Product.findOne({ shortId });
    return product;
  }

  async findAllByCategoryId(categoryId) {
    const products = await Product.find({ categoryId });
    return products;
  }

  async findAllByBrand(brand) {
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

  async delete(_id) {
    const result = await Product.findOneAndDelete({ _id });
    return result;
  }

  // 좋아요 +1
  async updateLike(product, userId, isLike) {
    const filter = { _id: product._id };
    const option = { returnOriginal: false };
    let updatedLike;
    if (isLike === false) {
      updatedLike = await Product.findOneAndUpdate(
        filter,
        {
          $inc: { likeCount: -1 },
          $pull: { likeUsers: { userId } },
        },
        option,
      );
    } else {
      updatedLike = await Product.findOneAndUpdate(
        filter,
        {
          $inc: { likeCount: 1 },
          $push: { likeUsers: { userId } },
        },
        option,
      );
    }
    return updatedLike;
  }
}

const productModel = new ProductModel();

export { productModel };
