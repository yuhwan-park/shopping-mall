import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { adminRequired } from '../middlewares';
import {
  orderService,
  productService,
  categoryService,
  userService,
} from '../services';

const adminRouter = Router();

// 관리자 메인 페이지
adminRouter.get('/', adminRequired, async (req, res, next) => {
  try {
    res.status(200).json({
      result: 'approach-success',
    });
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/', async (req, res, next) => {
  try {
    const userToken = req.headers['authorization']?.split(' ')[1];
    if (!userToken || userToken === 'null') {
      throw new Error();
    }
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const role = jwtDecoded.role;
    if (role === 'admin') {
      res.status(200).json({
        result: 'admin'
      })
    } else if (role === 'basic-user') {
      res.status(200).json({
        result: 'basic-user'
      })
    }
  } catch (err) {
    next(err);
  }
})

/****************************/
/********* category *********/
/****************************/

// 카테고리 생성
adminRouter.post(
  '/categories/create',
  adminRequired,
  async (req, res, next) => {
    try {
      const { name, content, imageURL } = req.body;
      const newCategory = await categoryService.addCategory({
        name,
        content,
        imageURL,
      });
      res.status(200).json(newCategory);
    } catch (err) {
      next(err);
    }
  },
);

// 카테고리 목록
adminRouter.get('/categories', adminRequired, async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

// 카테고리 상세
adminRouter.get('/categories/:id', adminRequired, async (req, res, next) => {
  try {
    const shortId = req.params.id;
    const category = await categoryService.getCategory(shortId);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
});

// 카테고리 변경
adminRouter.patch(
  '/categories/:id/update',
  adminRequired,
  async (req, res, next) => {
    try {
      const shortId = req.params.id;
      const { name, content, imageURL } = req.body;
      const toUpdate = {
        name,
        content,
        imageURL,
      };

      const updatedCategory = await categoryService.setCategory(
        shortId,
        toUpdate,
      );
      res.status(200).json(updatedCategory);
    } catch (err) {
      next(err);
    }
  },
);

// 카테고리 삭제
adminRouter.delete(
  '/categories/:id/delete',
  adminRequired,
  async (req, res, next) => {
    try {
      const shortId = req.params.id;
      const result = await categoryService.deleteCategory(shortId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

/****************************/
/********* products *********/
/****************************/

// 상품 추가
adminRouter.post('/products', adminRequired, async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});

// 상품 전부 조회
adminRouter.get('/products', adminRequired, async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// 상품 상세 조회
adminRouter.get('/products/:id', adminRequired, async (req, res, next) => {
  try {
    const shortId = req.params.id;
    const product = await productService.getProduct(shortId);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// 상품 삭제
adminRouter.delete(
  '/products/:id/delete',
  adminRequired,
  async (req, res, next) => {
    try {
      const shortId = req.params.id;
      const result = await productService.deleteProduct(shortId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

// 상품 정보 수정
adminRouter.patch('/products/:id', adminRequired, async (req, res, next) => {
  try {
    const shortId = req.params.id;
    const updateRequest = req.body;
    const updatedProduct = await productService.setProduct(
      shortId,
      updateRequest,
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

/******************************/
/********* user,order *********/
/******************************/

// 전체 사용자 목록 조회
adminRouter.get('/userlist', adminRequired, async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// 특정 사용자 주문 목록 조회
adminRouter.post('/orders', adminRequired, async (req, res, next) => {
  try {
    const { email } = req.body;
    const userId = await userService.getUserIdByEmail(email);
    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

// 특정 사용자 주문 상세 조회
adminRouter.get('/orders/:shortId', adminRequired, async (req, res, next) => {
  try {
    const {shortId} = req.params
    const order = await orderService.getOrderInfo(shortId);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});


//사용자 주문 삭제
adminRouter.delete('/orders/:shortId', adminRequired, async (req, res, next) => {
  try {
    const {shortId} = req.params;
    const deletedOrder = await orderService.deleteOrder(shortId)
    res.status(200).json(deletedOrder);
  } catch (err) {
    next(err)
  }
})

export { adminRouter };
