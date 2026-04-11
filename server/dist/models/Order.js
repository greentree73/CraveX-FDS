import { Schema, model } from "mongoose";
const OrderSchema = new Schema({
    status: {
        type: String,
        enum: [
            "pending",
            "preparing",
            "ready",
            "out_for_delivery",
            "delivered",
            "cancelled",
        ],
        default: "pending",
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    orderItems: [
        {
            quantity: { type: Number, required: true },
            menuItemId: {
                type: Schema.Types.ObjectId,
                ref: "MenuItem",
                required: true
            },
        }
    ],
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    driverId: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
    }
}, { timestamps: true });
const Order = model("Order", OrderSchema);
export { OrderSchema };
export default Order;
