import { Router } from 'express';
import { productService, categoryService } from '../services';
import { pagination } from '../middlewares'

const productRouter = Router();

productRouter.get('/', async (req, res, next) => {
  try {
    const { category, page, perPage } = req.query;
    const { _id } = await categoryService.getIdByShortId(category);
    const products = await productService.getProductsByCategoryId(_id);
    const posts = await pagination(products, Number(page), Number(perPage))
    res.status(200).json(posts)
    // res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

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
