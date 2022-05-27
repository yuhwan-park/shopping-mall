import { Schema, model } from 'mongoose';

const AddressSchema = new Schema ({
          postalCode: {
              type: String,
            required: true
        },
          address1: {
              type: String,
            required: true
        },
          address2: {
              type: String,
            required: true
        },
})
const Address = model('addresses', AddressSchema);

export { AddressSchema };
export { Address };