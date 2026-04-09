export const categories = [
  { _id: "c1", name: "Pizza" },
  { _id: "c2", name: "Burgers" },
];

export const restaurants = [
  { _id: "r1", name: "Pizza Place", address: "123 St", categoryId: "c1" },
];

export const menuItems = [
  { _id: "m1", name: "Pepperoni Pizza", price: 12, restaurantId: "r1" },
];

export let orders: any[] = [];
