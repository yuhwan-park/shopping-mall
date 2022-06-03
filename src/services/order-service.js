import { orderModel } from '../db';
class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 주문 생성
  async addOrderInfo(orderInfo) {
    // db에 저장
    const createdNewOrder = await this.orderModel.create(orderInfo);

    return createdNewOrder;
  }

  // 사용자 주문 전체 조회 - user, admin에서 사용
  async getOrdersByUserId(userId) {
    const orders = await this.orderModel.findById(userId);
    return orders;
  }

  // 사용자 특정 주문 상세 조회
  async getOrderInfo(shortId) {
    const orderInfo = await this.orderModel.findByShortId(shortId);

    if (!orderInfo) {
      throw new Error('해당 주문이 존재하지 않습니다.');
    }

    return orderInfo;
  }

  // 주문 상태 변경
  async updateOrder(shortId) {
    // shortId로 해당 order 주문취소
    const updatedOrder = await this.orderModel.update(shortId);

    if (!updatedOrder) {
      throw new Error('해당 주문이 존재하지 않습니다.');
    }

    return updatedOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
