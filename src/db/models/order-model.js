import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
import { productModel } from './product-model';

const Order = model('orders', OrderSchema);

export class OrderModel {
  // 주문 생성
  async create(orderInfo) {
    // product 정보 가져오기
    // shortId를 사용해서 ObjectId를 가져온다!
    const { products } = orderInfo;
    // products = [{shortId, quantity}]
    // products에 값이 있을 경우 값 추출

    for (let i = 0; i <= products.length; i++) {
      const { shortId } = products[i];

      // productModel에서 shortId로 검색
      const product = await productModel.findOne({
        shortId,
      });
      delete products[i].shortId;
      products[i].productId = product._id;
      // products = [{productId, quantity}]
    }

    orderInfo.products = products;

    // orderDB에 데이터 추가
    const createdNewOrder = await Order.create({ orderInfo });
    return createdNewOrder;
  }

  // 주문 상세 조회
  async findById(shortId) {
    const order = await Order.findOne({ shortId });
    return order;
  }

  // 유저로 주문 찾기
  async findByUserId(userId) {
    const orders = await Order.find({ userId })
    return orders
  }

  // 사용자용 주문 전체 조회
  async userfindAll(userobjectId) {
    const orders = await Order.findMany({ userobjectId });
    return orders;
  }

  // 관리자용 주문 전체 조회
  async adminfindAll() {
    const orders = await Order.find({});
    return orders;
  }

  // 주문 취소
  async delete({ shortId }) {
    const deletedOrder = await Order.findOneAndDelete({ _id });
    return deletedOrder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
