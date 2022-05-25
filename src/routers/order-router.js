import { Router } from 'express';
import is from '@sindresorhus/is';
import { loginRequired } from '../middlewares';
import { orderService } from '../services';

const orderRouter = Router();

// 주문 생성
orderRouter.post('/', async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }
    // 주문 안에 상품이 여러개일 경우, products를 배열로 받아온다.
    // products = [{shortId, quantity}]
    const { orderInfo } = req.body;

    // jwt token
    const userId = req.currentuserId;

    // 위 데이터를 주문 db에 추가하기
    const newOrder = await orderService.addOrder(orderInfo);

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// // 주문 상세 조회
// orderRouter.get('/:userId/orderId', async function (req, res, next) {
//   try {
//     // 전체 사용자 목록을 얻음
//     const orders = await orderService.getOrders();

//     res.status(200).json(orders);
//   } catch (error) {
//     next(error);
//   }
// });

// // 주문 조회
// orderRouter.get('/orders/:userId/', async (req, res, next) => {});

// // 주문 삭제
// orderRouter.delete('/:userId/orderId', async (req, res, next) => {});

// // 주문 수정
// // orderRouter.fetch(async (req, res, next) => {});
// // export { orderRouter };
