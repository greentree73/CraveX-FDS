
export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  categoryIds: string[];
  menuItemIds: string[];
}
