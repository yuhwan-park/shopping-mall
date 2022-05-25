import { Router } from 'express';
import is from '@sindresorhus/is';
import { loginRequired } from '../middlewares';
import { orderService } from '../services';

const orderRouter = Router();

// 주문 생성 - 질문
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
    const {
      products, // products = [{shortId, quantity}]
      ordererName,
      phoneNumber,
      postalCode,
      address1,
      address2,
      deliveryRequest,
      deliveryFee,
      totalPrice,
    } = req.body.orderInfo;
    // jwt token
    const userId = req.currentuserId;

    const address = { postalCode, address1, address2 };

    const orderer = {
      ordererName,
      phoneNumber,
      deliveryRequest,
    };

    // products에 값이 있을 경우 값 추출
    // for (i = 0; i <= products.length; i++) {
    //   const { shortId, quantity } = products[i];
    //   return { shortId, quantity };
    // }

    const orderInfo = {
      id,
      quantity,
      userId,
      orderer,
      address,
      deliveryFee,
      totalPrice,
    };

    // 위 데이터를 주문 db에 추가하기
    const newOrder = await orderService.addOrder(orderInfo);

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// 주문 상세 조회
orderRouter.get('/:userId/orderId', async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// 주문 조회
orderRouter.get(async (req, res, next) => {});

// 주문 삭제
orderRouter.delete(async (req, res, next) => {});

// 주문 수정
// orderRouter.fetch(async (req, res, next) => {});
// export { orderRouter };
