import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  async findByName(name) {
    const category = await Category.findOne({ name });
    return category;
  }

  async findById(shortId) {
    const category = await Category.findOne({ shortId });
    return category;
  }

  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async create(categoryInfo) {
    const createdCategory = await Category.create(categoryInfo);
    return createdCategory;
  }

  async update({ shortId, update }) {
    const filter = { shortId };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedCategory;
  }

  async delete(_id) {
    const result = await Category.findOneAndDelete({ _id });
    return result;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
