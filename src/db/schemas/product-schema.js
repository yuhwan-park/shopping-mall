import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
        index:true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export { ProductSchema };
