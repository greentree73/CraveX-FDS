export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: "customer" | "owner" | "admin";
};

export type Category = {
  _id: string;
  name: string;
  description?: string;
};

export type Restaurant = {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  categoryIds: string[];
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
  restaurantId: string;
  categoryId?: string;
};

export type OrderItemInput = {
  quantity: number;
  menuItemId: string;
};

export type Order = {
  _id: string;
  status: string;
  totalAmount: number;
  restaurantId: string;
  customerId: string;
  driverId?: string;
  orderItems: {
    quantity: number;
    menuItemId: string;
  }[];
};

export type PaymentStatus = "pending" | "completed";
export type PaymentMethod = "credit_card" | "cash";

export type CartItem = MenuItem & {
  quantity: number;
};
