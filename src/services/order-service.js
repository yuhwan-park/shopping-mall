import { userModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 주문 생성
  async addOrder(orderInfo) {
    // 객체 destructuring
    const {
      shortId,
      quantity,
      ordererName,
      phoneNumber,
      address,
      totalPrice,
      deliveryFee,
      deliveryRequest,
    } = orderInfo;

    const newOrderInfo = {
      shortId, // find로 product 정보 찾기
      quantity,
      ordererName,
      phoneNumber,
      address,
      totalPrice,
      deliveryFee,
      deliveryRequest,
    };

    // db에 저장
    const createdNewOrder = await this.orderModel.create(newOrderInfo);

    return createdNewOrder;
  }

  // 주문 전체 조회
  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  // 주문 수정 - 추가, 수량변경
  async setOrder(orderInfoRequired, toUpdate) {
    // 객체 destructuring
    const { quantity, name, address, currentPassword } = orderInfoRequired;

    // 우선 해당 id의 주문이 db에 있는지 확인
    let order = await this.orderModel.findById(orderId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!order) {
      throw new Error('주문 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    // 이제 드디어 업데이트 시작

    // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }
}

const userService = new UserService(userModel);

export { userService };
