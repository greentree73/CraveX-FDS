import type { Category } from "./Category";

export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  category: string; // Category ID
}
