import { Router } from 'express';

import { adminRequired } from '../middlewares';
import { productService } from '../services';
import { categoryService } from '../services';

const adminRouter = Router();

// 관리자 메인 페이지
adminRouter.get('/', adminRequired, async (req, res) => {
  res.status(200).json({
    result: 'approach-success',
  });
});

/****************************/
/********* category *********/
/****************************/

// 카테고리 생성
adminRouter.post('/categories/create', adminRequired, async (req, res) => {
  const { name, content, imageURL } = req.body;
  const newCategory = await categoryService.addCategory({
    name,
    content,
    imageURL,
  });
  res.status(200).json(newCategory);
});

// 카테고리 목록
adminRouter.get('/categories', adminRequired, async (req, res) => {
  const categories = await categoryService.getCategories();
  res.status(200).json(categories);
});

// 카테고리 변경
adminRouter.patch('/categories/:id/update', adminRequired, async (req, res) => {
  const shortId = await req.params.id;
  const { name, content, imageURL } = req.body;
  const toUpdate = {
    name,
    content,
    imageURL,
  };

  const updatedCategory = await categoryService.setCategory(shortId, toUpdate);
  res.status(200).json(updatedCategory);
});

// 카테고리 삭제
adminRouter.delete(
  '/categories/:id/delete',
  adminRequired,
  async (req, res) => {
    const shortId = await req.params.id;
    const result = await categoryService.deleteCategory(shortId);
    res.status(200).json(result);
  },
);

/****************************/
/********* products *********/
/****************************/

// 상품 추가
adminRouter.post('/products', adminRequired, async (req, res) => {
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

// 상품 전부 조회
adminRouter.get('/products', adminRequired, async (req, res) => {
  const products = await productService.getProducts();
  res.status(200).json(products);
});

// 상품 상세 조회
adminRouter.get('/products/:id', adminRequired, async (req, res) => {
  const shortId = req.params.id;
  const product = await productService.getProduct(shortId);
  res.status(200).json(product);
});

// 상품 삭제
adminRouter.delete('/products/:id', adminRequired, async (req, res) => {
  const shortId = req.params.id;
  const result = await productService.delete(shortId);
  res.status(200).json(result);
});

// 상품 정보 수정
adminRouter.patch('/products/:id', adminRequired, async (req, res) => {
  const shortId = req.params.id;
  const {
    category,
    brand,
    name,
    shortDescription,
    detailDescription,
    imageURL,
    price,
  } = req.body;
  const toUpdate = {
    category,
    brand,
    name,
    shortDescription,
    detailDescription,
    imageURL,
    price,
  };
  const updatedProduct = await productService.setProduct(shortId, toUpdate);
  res.status(200).json(updatedProduct);
});
export { adminRouter };
