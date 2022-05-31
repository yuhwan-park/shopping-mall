import { Router } from 'express';
import { productService, categoryService } from '../services';

const productRouter = Router();


//상품 검색
productRouter.get('/result', async (req, res, next) => {
  try{
    const { q } = req.query;
    const result = await productService.getProductsByName(q)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

//카테고리 별 상품 조회
productRouter.get('/', async (req, res, next) => {
  try {
    console.log(req.query)
    const { category } = req.query;
    const { _id } = await categoryService.getIdByShortId(category);
    const products = await productService.getProductsByCategoryId(_id);
    res.status(200).json(products);
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


export { productRouter };
