import { Schema, model } from "mongoose";

interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
  },
  { timestamps: true }
);

const Customer = model<ICustomer>("Customer", CustomerSchema);
export { ICustomer, CustomerSchema };
export default Customer;
