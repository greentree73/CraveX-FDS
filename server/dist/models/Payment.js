import { Schema, model } from "mongoose";
const PaymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    method: {
        type: String,
        enum: ["credit_card", "cash"],
        required: true,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    }
}, { timestamps: true });
const Payment = model("Payment", PaymentSchema);
export { PaymentSchema };
export default Payment;
