import { Schema } from 'mongoose';
const OrderSchema = new Schema(
  {
    products: [
      {
        product: {
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
    },
  },
  {
    timestamps: true,
  },
);

export { OrderSchema };
