import { orderModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 주문 생성
  async addOrder(orderInfo) {
    // db에 저장
    const createdNewOrder = await this.orderModel.create(orderInfo);

    return createdNewOrder;
  }

  // 주문 전체 조회
  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  // email => userId로 주문 조회
  async getOrdersByUserId(userId) {
    const orders = await this.orderModel.findByUserId(userId);
    return orders;
  }

  // 주문 정보로 주문 모두 찾기
  async getOrdersByshortId(shortId) {
    const orders = await this.orderModel.findById({ shortId });
    return orders;
  }

  // shortId로 주문 삭제
  async deleteByShortId(shortId) {
    const { _id } = await this.orderModel.findById({ shortId });
    const deletedOrder = await this.orderModel.delete(_id)
    return deletedOrder
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
