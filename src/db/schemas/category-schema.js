import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const CategorySchema = new Schema(
  {
    shortId,
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'categories',
  },
);

export { CategorySchema };
