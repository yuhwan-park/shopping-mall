import { productModel } from '../db';
import { categoryService } from './';
class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct(productInfo) {
    const {
      category,
      brand,
      name,
      shortDescription,
      detailDescription,
      imageURL,
      price,
    } = productInfo;

    // 같은 상품 중복을 걸러낼 수 있는 방법이 무엇이 있을까 고민됨
    const product = await this.productModel.findOneByName(name);
    if (product) {
      throw new Error('이미 해당 상품이 존재합니다.');
    }

    const categoryId = await categoryService.getIdByName(category);
    const newProductInfo = {
      categoryId,
      brand,
      name,
      shortDescription,
      detailDescription,
      imageURL,
      price: Number(price),
    };

    // db에 저장
    const createdNewProduct = await this.productModel.create(newProductInfo);
    return createdNewProduct;
  }

  // 모든 상품 목록을 받음.
  async getProducts() {
    const products = await this.productModel.findAll();
    return products;
  }

  // 상품 상세 조회
  async getProduct(shortId) {
    const product = await this.productModel.findById(shortId);
    return product;
  }

  // name으로 상품 검색
  async getProductsByName(filter) {
    const products = await this.productModel.findByName(filter);
    return products;
  }

  //category에 따른 상품 목록
  async getProductsByCategoryId(categoryId) {
    const products = await this.productModel.findAllByCategoryId(categoryId);
    return products;
  }

  //brand에 따른 상품 목록
  async getProductsByBrand(brand) {
    const products = await this.productModel.findAllByBrand(brand);
    return products;
  }

  // 상품 정보 수정
  async setProduct(shortId, updateRequest) {
    // 상품 존재 여부 확인 후 에러 반환
    let product = await this.productModel.findById(shortId);
    if (!product) {
      throw new Error('상품이 존재하지 않습니다. 다시 한 번 확인해 주세요.');
    }

    // new category => new categoryId
    const {
      category,
      brand,
      name,
      shortDescription,
      detailDescription,
      imageURL,
      price,
    } = await updateRequest;

    const toUpdate = {
      categoryId: category,
      brand,
      name,
      shortDescription,
      detailDescription,
      imageURL,
      price,
    };

    // 업데이트 진행
    product = await this.productModel.update({
      shortId,
      update: toUpdate,
    });
    return product;
  }

  //상품 삭제
  async deleteProduct(shortId) {
    const { _id } = await this.productModel.findById(shortId);
    const product = await this.productModel.delete(_id);
    return product;
  }

  // 좋아요 기능
  async updateLikeCount(product, islike) {
    const { _id } = product;
    let { likeCount } = product;
    islike === true ? likeCount++ : likeCount--;
    const updatedLike = await this.productModel.updateLike(_id, likeCount);
    return updatedLike;
  }
}

const productService = new ProductService(productModel);

export { productService };
