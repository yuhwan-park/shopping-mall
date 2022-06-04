import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export class UserModel {
  // 회원가입
  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  // 이메일로 유저 찾기 - 회원가입, 로그인, admin
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // userId로 유저 찾기 - 삭제, 사용자 정보 조회
  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  // admin
  async findAll() {
    const users = await User.find({});
    return users;
  }

  // 사용자 정보 수정
  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  // 삭제
  async delete(userId) {
    const deleteUser = await User.findOneAndDelete({ _id: userId });
    return deleteUser;
  }
}

const userModel = new UserModel();

export { userModel };
export { User };
