import { Schema } from 'mongoose';
const OrderSchema = new Schema(
  {
    products: {
      items: {
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
    },
    orderer: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export { OrderSchema };
