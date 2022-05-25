import { Schema } from 'mongoose';
import { nanoid } from 'nanoid';

const OrderSchema = new Schema(
  {
    shortId: {
      type: String,
      default: () => {
        return nanoid();
      },
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderer: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
        required: true,
      },
      deliveryRequest: {
        type: String,
        required: true,
      },
    },
    deliveryFee: {
      type: String || Number, // 무료일 경우 대비, String
      required: true,
    },
    totalPrice: {
      type: String, // String, Number?
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export { OrderSchema };
