import { Schema } from 'mongoose';
import { orderService } from '../../services';
import { shortId } from './types/short-id';
import { AddressSchema } from './address-schema';

const OrderSchema = new Schema(
  {
    shortId,
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    ordererName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      AddressSchema
    },
    deliveryRequest: {
      type: String,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'orders',
  },
);

export { OrderSchema };
