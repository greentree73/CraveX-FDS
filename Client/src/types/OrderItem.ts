export interface OrderItem {
  _id: string;
  quantity: number;
  menuItemId: string; // menuItem ID
  orderId: string;
}
