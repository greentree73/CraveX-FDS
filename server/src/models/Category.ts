import { Schema, model } from "mongoose";

interface ICategory extends Document {
  name: string;
  description: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Category = model<ICategory>("Category", CategorySchema);
export { ICategory, CategorySchema };
export default Category;
