import { Router } from 'express';
import { orderService, userService } from '../services';
import { loginRequired } from '../middlewares';

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

// 사용자의 주문 전체 조회
orderRouter.get('/', loginRequired, async (req, res, next) => {
  try {
    // 특정 사용자의 전체 주문 목록을 얻음
    const userId = req.currentuserId;
    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// 사용자의 특정 주문 상세 조회
orderRouter.get('/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const order = await orderService.getOrdersByshortId(shortId);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

// 주문 삭제
orderRouter.delete('/:ShortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const result = await orderService.deleteByShortId(shortId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }  
});

export { orderRouter };
