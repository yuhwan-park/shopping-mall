import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export class UserModel {
  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  // 삭제
  async delete(_id) {
    const deleteUser = await User.findOneAndDelete({ _id });
    return deleteUser;
  }

  // 삭제, 사용자 정보 조회에서 사용
  async findById(_id) {
    const user = await User.findOne({ _id });
    return user;
  }

  // admin
  async findAll() {
    const users = await User.find({});
    return users;
  }

  // admin
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // admin
  async findByShortId(shortId) {
    const user = await User.findOne({ shortId });
    return user;
  }
}

const userModel = new UserModel();

export { userModel };
export { User };
