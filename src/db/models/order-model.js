import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
import { productModel } from './product-model';
import { User } from './user-model';

const Order = model('orders', OrderSchema);

export class OrderModel {
  // 주문 생성
  async create(orderInfo) {
    const { userId } = orderInfo;
    // orderDB에 데이터 추가
    const createdNewOrder = await Order.create(orderInfo);

    // 사용자 주소를 입력한 주소로 업데이트
    const user = await User.findById(userId);
    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      { address: createdNewOrder.address },
    );
    return createdNewOrder;
  }

  // 전체 주문 목록 조회 - user, admin에서 사용
  async findByUserId(_id) {
    const orders = await Order.find({ userId: _id });
    return orders;
  }

  // 사용자 특정 주문 상세 조회
  async findById(shortId) {
    const orderInfo = await Order.findOne({ shortId });
    return orderInfo;
  }

  // 주문 삭제(취소)
  async delete(orderId) {
    const deletedOrder = await Order.findOneAndDelete({ _id: orderId });
    return deletedOrder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
