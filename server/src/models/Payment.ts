import { Schema, model } from "mongoose";

interface IPayment extends Document {
  amount: number;
  status: "pending" | "completed";
  method: "credit_card" | "cash";
  orderId: Schema.Types.ObjectId;
}

const PaymentSchema = new Schema<IPayment>(
  {
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
  },
  { timestamps: true },
);

const Payment = model<IPayment>("Payment", PaymentSchema);
export { IPayment, PaymentSchema };
export default Payment;
