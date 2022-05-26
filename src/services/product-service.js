import { productModel } from '../db';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }
  async addProduct(productInfo) {
    const { category, name, imageURL, price, content, brand } = productInfo;

    // 같은 상품 중복을 걸러낼 수 있는 방법이 무엇이 있을까 고민됨
    const product = await this.productModel.findOneByName(name);
    if (product) {
      throw new Error('이미 해당 상품이 존재합니다.');
    }
    const newProductInfo = { category, name, imageURL, price, content, brand };

    // db에 저장
    const createdNewProduct = await this.productModel.create(newProductInfo);

    return createdNewProduct;
  }

  // 모든 상품 목록을 받음.
  async getProducts() {
    const products = await this.productModel.findAll();
    return products;
  }

  //category에 따른 상품 목록
  async getProductsByCategory(category) {
    const products = await this.productModel.findAllByCategory(category);
    return products;
  }

  //bran에 따른 상품 목록
  async getProductsByBrand(brand) {
    const products = await this.productModel.findAllByBrand(brand);
    return products;
  }

  // 상품 정보 수정
  async setProduct(shortId, toUpdate) {
    // 상품 존재 여부 확인 후 에러 반환
    let product = await this.productModel.findById(shortId);

    if (!product) {
      throw new Error('상품이 존재하지 않습니다. 다시 한 번 확인해 주세요.');
    }

    // 업데이트 진행
    product = await this.productModel.update({
      shortId,
      update: toUpdate,
    });

    return product;
  }

  //상품 삭제
  async deleteProduct(shortId) {
    const product = await this.productModel.delete(shortId);

    return product;
  }
}

const productService = new ProductService(productModel);

export { productService };
