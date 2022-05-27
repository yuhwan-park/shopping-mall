import { Schema } from 'mongoose';
import { shortId } from './types/short-id';
import { AddressSchema } from './address-schema';

const UserSchema = new Schema(
  {
    shortId,
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    orderInfo: [
      // 주문번호
      {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        required: false,
      },
    ],
    address: AddressSchema,
    role: {
      type: String,
      required: false,
      default: 'basic-user',
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };
