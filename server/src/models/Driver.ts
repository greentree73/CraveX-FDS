import { Schema, model } from "mongoose";

interface IDriver extends Document {
  name: string;
  phone: string;
  isAvailable: boolean;
 
}

const DriverSchema = new Schema<IDriver>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Driver = model<IDriver>("Driver", DriverSchema);
export { IDriver, DriverSchema };
export default Driver;
