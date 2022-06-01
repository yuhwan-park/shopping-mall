import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const OrderSchema = new Schema(
  {
    shortId,
    shortTitle: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    products: {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
      },
      quantity: {
        type: Number,
      },
    },
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
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        },
      ),
      required: false,
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
