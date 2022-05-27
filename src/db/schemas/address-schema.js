import { Schema } from 'mongoose';

const address = new Schema ({
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

export { AdressSchema };
export { Address };