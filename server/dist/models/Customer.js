import { Schema, model } from "mongoose";
const CustomerSchema = new Schema({
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
}, { timestamps: true });
const Customer = model("Customer", CustomerSchema);
export { CustomerSchema };
export default Customer;
