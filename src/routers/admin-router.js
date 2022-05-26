import { Router } from 'express';
import is from '@sindresorhus/is';

import { adminRequired } from '../middlewares';
import { productService } from '../services';
import { categoryService } from '../services';

const adminRouter = Router();

adminRouter.get('/', adminRequired, async (req, res) => {
  res.status(200).json({
    result: 'approach-success',
  });
});

adminRouter.post('/products', async (req, res) => {
  const {
    category,
    brand,
    name,
    shortDescription,
    detailDescription,
    imageURL,
    price,
  } = req.body;
  const newproduct = await productService.addProduct({
    category,
    brand,
    name,
    shortDescription,
    detailDescription,
    imageURL,
    price,
  });
  res.status(200).json(newproduct);
});

adminRouter.post('/categories', async (req, res) => {
  const {
    name,
    content,
    imageURL,
  } = req.body;
  const newCategory = await categoryService.addCategory({
    name,
    content,
    imageURL,
  });
  res.status(200).json(newCategory);
});


export { adminRouter };
