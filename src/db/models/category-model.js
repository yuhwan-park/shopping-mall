import { model } from 'mongoose';
import { CategorySchema } from '../schemas/user-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  async findByName(name) {
    const category = await Category.findOne({ name });
    return category;
  }

  async findById(categoryId) {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  }

  async create(categoryInfo) {
    const createdCategory = await Category.create(categoryInfo);
    return createdCategory;
  }

  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async update({ categoryId, update }) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(filter, update, option);
    return updatedCategory;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
