import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
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
    }
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export { CategorySchema };
