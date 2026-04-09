import { Schema, model } from "mongoose";

interface IOrderItem extends Document {
  quantity: number;
  menuItemId: Schema.Types.ObjectId;
}

interface IOrder extends Document {
  status:
    | "pending"
    | "preparing"
    | "ready"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";

  totalAmount: number;
  orderItems: IOrderItem[];
  restaurantId: Schema.Types.ObjectId;
  customerId: Schema.Types.ObjectId;
  driverId?: Schema.Types.ObjectId;
}

const OrderSchema = new Schema<IOrder>(
  {
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
    orderItems:[
    {
      quantity: { type: Number, required: true },
      menuItemId: { 
        type: Schema.Types.ObjectId, 
        ref: "MenuItem",  
        required: true 
      },
    }],
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
  },
  { timestamps: true },
);

const Order = model<IOrder>("Order", OrderSchema);
export { IOrder, OrderSchema };
export default Order;
