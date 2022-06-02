import { Router } from 'express';
import { productService, categoryService } from '../services';

const productRouter = Router();




//카테고리 별 상품 조회
productRouter.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const { _id } = await categoryService.getIdByShortId(category);
    const products = await productService.getProductsByCategoryId(_id);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

//상품 검색
productRouter.get('/search/result', async (req, res, next) => {
  try{
    const { q } = req.query;
    const result = await productService.getProductsByName(q)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

//상품 상세 조회
productRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProduct(id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

//상품 좋아요 top 4 조회
productRouter.get('/filter/likes', async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    const sorted = await products.sort((a, b) => b.likeCount - a.likeCount);
  } catch (err) {
    next(err)
  }
})

//상품 최신순 top 4 조회
productRouter.get('/filter/new', async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    const sorted = await products.sort((a, b) => b.createdAt - a.createdAtAt);
  } catch (err) {
    next(err)
  }
})

export { productRouter };
