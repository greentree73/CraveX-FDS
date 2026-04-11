import { Schema, model } from "mongoose";
const RestaurantSchema = new Schema({
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
}, { timestamps: true });
const Restaurant = model("Restaurant", RestaurantSchema);
export { RestaurantSchema };
export default Restaurant;
