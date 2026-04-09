import type { Types } from "mongoose";
import type { OrderItem } from './OrderItem';

export interface Order {

  _id: string;
   status:
    | "pending"
    | "preparing"
    | "ready"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  totalAmount: number;
  orderitems: OrderItem[];
  restaurantId: string;  //Restaurant ID
  customerId: string;    //Customer ID
  driverId: string;  //Driver ID
}
