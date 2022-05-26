import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(shortId) {
    const user = await User.findOne({ shortId });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ shortId, update }) {
    const filter = { shortId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  // 삭제
  async delete( _id) {
    const deleteUser = await User.findOneAndDelete({ _id });
    return deleteUser;
  }
}

const userModel = new UserModel();

export { userModel };
