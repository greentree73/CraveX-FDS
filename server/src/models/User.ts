import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: "customer" | "owner" | "admin";
  comparePassword(plain: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true, 
      trim: true,
    },

    address: {
      type: String,
      required: true, 
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    role: {
      type: String,
      enum: ["customer", "owner", "admin"],
      default: "customer",
    },
  },
  { timestamps: true },
);

// Hash password before save (similar to Sequelize hooks)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(
    parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
  );
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


UserSchema.methods.comparePassword = async function (plainPassword: string) {
  return bcrypt.compare(plainPassword, this.password);
};

const User = model<IUser>("User", UserSchema);

export { IUser, UserSchema };
export default User;
