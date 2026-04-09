export interface Payment {
    _id: string;
  amount: number;
  status: "pending" | "completed";
  method: "credit card" | "cash";
  orderId: string; //Order ID
}
