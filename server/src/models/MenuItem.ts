import { Schema, model } from "mongoose";

interface IMenuItem extends Document {
  name: string;
  price: number;
  categoryId: Schema.Types.ObjectId;
  restaurantId: Schema.Types.ObjectId;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    }
  },
  { timestamps: true }
);

const MenuItem = model<IMenuItem>("MenuItem", MenuItemSchema);
export { IMenuItem, MenuItemSchema };
export default MenuItem;
