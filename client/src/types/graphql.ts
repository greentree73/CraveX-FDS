import { User, Category, Restaurant, MenuItem, Order } from "./index";

export type GetCategoriesResponse = {
  categories: Category[];
};

export type GetRestaurantsResponse = {
  restaurants: Restaurant[];
};

export type GetMenuItemsResponse = {
  menuItems: MenuItem[];
};

export type GetOrdersResponse = {
  orders: Order[];
};

export type GetUsersResponse = {
  users: User[];
};

export type LoginResponse = {
  login: {
    token: string;
    user: User;
  };
};

export type RegisterResponse = {
  register: {
    token: string;
    user: User;
  };
};

export type PlaceOrderResponse = {
  placeOrder: {
    _id: string;
    status: string;
    totalAmount: number;
  };
};
