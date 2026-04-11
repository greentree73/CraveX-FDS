import { Schema, model } from "mongoose";
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
}, { timestamps: true });
const Category = model("Category", CategorySchema);
export { CategorySchema };
export default Category;
