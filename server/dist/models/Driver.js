import { Schema, model } from "mongoose";
const DriverSchema = new Schema({
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
}, { timestamps: true });
const Driver = model("Driver", DriverSchema);
export { DriverSchema };
export default Driver;
