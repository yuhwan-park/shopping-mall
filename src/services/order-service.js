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

  // 이메일로 주문 조회
  async getOrdersByUserId(userId) {
    const orders = await this.orderModel.findByUserId(userId);
    return orders
  }

  // 주문 정보로 주문 모두 찾기
  async getOrdersByObjectId(objectId) {
    const orders = await this.orderModel.find({objectId})
    return orders
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
