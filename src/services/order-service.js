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

  // 주문 취소
  async updateOrder(shortId) {
    // shortId로 해당 order 주문취소
    const updatedOrder = await this.orderModel.update(shortId);
    return updatedOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
