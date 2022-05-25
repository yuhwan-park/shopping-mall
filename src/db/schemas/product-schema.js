import { Schema } from 'mongoose';
import shortId from './types/short-id';

const ProductSchema = new Schema(
  {
    shortId,
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export { ProductSchema };
