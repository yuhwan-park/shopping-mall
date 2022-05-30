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
    const orders = await this.orderModel.findByUserId(userId);
    return orders;
  }

  // 사용자 특정 주문 상세 조회
  async getOrderInfo(shortId) {
    const orderInfo = await this.orderModel.findById(shortId);
    return orderInfo;
  }

  // 주문 삭제(취소)
  async deleteOrder(shortId) {
    // shortId로 orderId 추출
    const orderId = await this.orderModel.findById(shortId);
    // orderId로 해당 order 삭제
    const deletedOrder = await this.orderModel.delete(orderId);
    return deletedOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
