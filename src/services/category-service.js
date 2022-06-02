import { categoryModel } from '../db';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }
  async addCategory(categoryInfo) {
    const { name, content, imageURL } = categoryInfo;

    // 카테고리명 중복 확인
    const category = await this.categoryModel.findByName(name);
    if (category) {
      throw new Error('이미 해당 카테고리가 존재합니다.');
    }
    const newCategoryInfo = { name, content, imageURL };

    // db에 저장
    const createdNewCategory = await this.categoryModel.create(newCategoryInfo);

    return createdNewCategory;
  }

  //카테고리 name => objectId 
  async getIdByName(categoryname) {
    const category = await this.categoryModel.findByName(categoryname)
    if (!category) {
      throw new Error('카테고리가 존재하지 않습니다.')
    }
    const { _id } = category
    return _id
  }

  //카테고리 shortId => objectId
  async getIdByShortId(shortId) {
    const category = await this.categoryModel.findById(shortId)
    if (!category) {
      throw new Error('카테고리가 존재하지 않습니다.')
    }
    const { _id } = category
    return _id
  }

  //카테고리 전부 받기
  async getCategories() {
    const categories = await this.categoryModel.findAll();
    return categories
  }

  //카테고리들 이름만 받기 (사용 X)
  async getCategorynames() {
    const categories = await this.categoryModel.findAll();
    const names = categories.map((category) => {
      const { name } = category;
      return name;
    });
    return names;
  }

  // 카테고리 상세
  async getCategory(shortId) {
    const category = await this.categoryModel.findById(shortId)
    if (!category) {
      throw new Error('카테고리가 존재하지 않습니다.')
    }
    return category
  }

  // 카테고리 수정
  async setCategory(shortId, toUpdate) {
    // 상품 존재 여부 확인 후 에러 반환
    let category = await this.categoryModel.findById(shortId);

    if (!category) {
      throw new Error(
        '카테고리가 존재하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    // 업데이트 진행
    category = await this.categoryModel.update({
      shortId,
      update: toUpdate,
    });

    return category;
  }

  //카테고리 삭제
  async deleteCategory(shortId) {
    const { _id } = await this.categoryModel.findById(shortId)
    const result = await this.categoryModel.delete(_id);
    return result;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
