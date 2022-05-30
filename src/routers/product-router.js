import { Router } from 'express';
import { productService, categoryService } from '../services';

const productRouter = Router();

productRouter.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const categoryId = category.slice(0, -1);
    const { _id } = await categoryService.getIdByShortId(categoryId);
    const products = await productService.getProductsByCategoryId(_id);
    res.status(200).json(products);
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
