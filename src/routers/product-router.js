import { Router } from 'express';
import { productService, categoryService } from '../services';
import { pagination } from '../middlewares';

const productRouter = Router();

//카테고리 별 상품 조회
productRouter.get('/', async (req, res, next) => {
  try {
    const { category, currentPage, CountPerPage } = req.query;
    const { _id } = await categoryService.getIdByShortId(category);
    const products = await productService.getProductsByCategoryId(_id);
    const { totalPage, posts } = await pagination(
      products,
      Number(currentPage),
      Number(CountPerPage),
    )
    res.status(200).json({
      totalPage,
      posts,
    });
  } catch (err) {
    next(err);
  }
});

//상품 검색
productRouter.get('/search/result', async (req, res, next) => {
  try{
    const { q, currentPage, CountPerPage } = req.query;
    const result = await productService.getProductsByName(q)
    const { totalPage, posts } = await pagination(
      result,
      Number(currentPage),
      Number(CountPerPage)
    );
    res.status(200).json({
      totalPage,
      posts
    })
    //res.status(200).json(result)
  } catch (err) {
    next(err);
  }
});

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
productRouter.get('/list/likes', async (req, res, next) => {
  try {
    const allProducts = await productService.getProducts();
    const products = allProducts
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 4);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

//상품 최신순 top 4 조회
productRouter.get('/list/new', async (req, res, next) => {
  try {
    const allProducts = await productService.getProducts();
    const products = allProducts
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 4);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

export { productRouter };
