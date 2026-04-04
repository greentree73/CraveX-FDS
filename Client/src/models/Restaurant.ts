import type {Category} from './Category';
import type { MenuItem } from "./MenuItem";

export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  categories: Category[];
  menuItems: MenuItem[];
}
