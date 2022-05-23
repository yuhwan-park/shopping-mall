import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    category: {
        type: String,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    product_name: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: true
    }

  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export { ProductSchema };
