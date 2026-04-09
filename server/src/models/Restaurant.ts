import { Schema, model, Document, Types } from "mongoose";

interface IRestaurant extends Document {
  name: string;
  address: string;
  phone: string;
  categoryIds: Types.ObjectId[];
  menuItemIds: Types.ObjectId[];
}

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    categoryIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    menuItemIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",
      },
    ],
  },
  { timestamps: true },
);

const Restaurant = model<IRestaurant>("Restaurant", RestaurantSchema);
export { IRestaurant, RestaurantSchema };
export default Restaurant;
