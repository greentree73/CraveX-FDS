import { Schema, model } from "mongoose";
const MenuItemSchema = new Schema({
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
}, { timestamps: true });
const MenuItem = model("MenuItem", MenuItemSchema);
export { MenuItemSchema };
export default MenuItem;
