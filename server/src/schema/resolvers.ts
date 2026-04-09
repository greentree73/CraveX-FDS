import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Driver from "../models/Driver.js";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_change_me";

const requireAuth = (context: any) => {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
};
const requireRole = (context: any, roles: string[]) => {
  requireAuth(context);

  if (!roles.includes(context.user.role)) {
    throw new Error("Not authorized");
  }
};

export const resolvers = {
  Query: {
    users: async (_parent: any, _args: any, context: any) => {
      requireRole(context, ["admin"]);
      return User.find();
    },

    categories: async () => {
      return Category.find();
    },

    restaurants: async () => {
      return Restaurant.find();
    },

    menuItems: async (_parent: any, args: { restaurantId: string }) => {
      return MenuItem.find({ restaurantId: args.restaurantId });
    },

    orders: async (_parent: any, _args: any, context: any) => {
      requireAuth(context);

      if (context.user.role === "admin") {
        return Order.find();
      }

      return Order.find({ customerId: context.user.id });
    },
  },

  Mutation: {
    register: async (
      _parent: any,
      args: {
        name: string;
        email: string;
        phone: string;
        address: string;
        password: string;
        role?: string;
      },
    ) => {
      const existing = await User.findOne({
        email: args.email.trim().toLowerCase(),
      });

      if (existing) {
        throw new Error("User already exists");
      }

      const user = await User.create({
        name: args.name.trim(),
        email: args.email.trim().toLowerCase(),
        phone: args.phone.trim(),
        address: args.address.trim(),
        password: args.password,
        role: args.role || "customer",
      });

      const token = jwt.sign(
        { id: user._id.toString(), role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" },
      );

      return {
        token,
        user,
      };
    },

    login: async (_parent: any, args: { email: string; password: string }) => {
      const email = args.email.trim().toLowerCase();

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const valid = bcrypt.compareSync(args.password, user.password);
      if (!valid) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user._id.toString(), role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" },
      );

      return {
        token,
        user,
      };
    },

    addRestaurant: async (
      _parent: any,
      args: {
        name: string;
        address: string;
        phone?: string;
        categoryIds?: string[];
        menuItemIds?: string[];
      },
      context: any,
    ) => {
      requireRole(context, ["owner", "admin"]);

      return Restaurant.create({
        name: args.name,
        address: args.address,
        phone: args.phone,
        categoryIds: args.categoryIds || [],
        menuItemIds: args.menuItemIds || [],
      });
    },

    addMenuItem: async (
      _parent: any,
      args: {
        name: string;
        price: number;
        restaurantId: string;
        categoryId?: string;
      },
      context: any,
    ) => {
      requireRole(context, ["owner", "admin"]);

      return MenuItem.create({
        name: args.name,
        price: args.price,
        restaurantId: args.restaurantId,
        categoryId: args.categoryId,
      });
    },

    addCategory: async (
      _parent: any,
      args: { name: string; description: string },
      context: any,
    ) => {
      requireRole(context, ["admin"]);

      return Category.create({
        name: args.name,
        description: args.description,
      });
    },

    addDriver: async (
      _parent: any,
      args: { name: string; phone: string },
      context: any,
    ) => {
      requireRole(context, ["admin"]);

      return Driver.create({
        name: args.name,
        phone: args.phone,
      });
    },

    addPayment: async (
      _parent: any,
      args: {
        orderId: string;
        amount: number;
        status: "pending" | "completed";
        method: "credit_card" | "cash";
      },
      context: any,
    ) => {
      return Payment.create({
        orderId: args.orderId,
        amount: args.amount,
        status: args.status,
        method: args.method,
      });
    },

    placeOrder: async (
      _parent: any,
      args: {
        totalAmount: number;
        orderItems: { quantity: number; menuItemId: string }[];
        restaurantId: string;
        driverId?: string;
      },
      context: any,
    ) => {
      requireRole(context, ["customer", "admin"]);

      return Order.create({
        totalAmount: args.totalAmount,
        orderItems: args.orderItems,
        restaurantId: args.restaurantId,
        driverId: args.driverId,
        customerId: context.user.id,
        status: "pending",
      });
    },

    updateRestaurant: async (
      _parent: any,
      args: {
        id: string;
        name?: string;
        address?: string;
        phone?: string;
        categoryIds?: string[];
        menuItemIds?: string[];
      },
      context: any,
    ) => {
      requireRole(context, ["owner", "admin"]);

      const updateData: any = {};
      if (args.name !== undefined) updateData.name = args.name;
      if (args.address !== undefined) updateData.address = args.address;
      if (args.phone !== undefined) updateData.phone = args.phone;
      if (args.categoryIds !== undefined)
        updateData.categoryIds = args.categoryIds;
      if (args.menuItemIds !== undefined)
        updateData.menuItemIds = args.menuItemIds;

      return Restaurant.findByIdAndUpdate(args.id, updateData, { new: true });
    },

    updateMenuItem: async (
      _parent: any,
      args: {
        id: string;
        name?: string;
        price?: number;
        restaurantId?: string;
        categoryId?: string;
      },
      context: any,
    ) => {
      requireRole(context, ["owner", "admin"]);

      const updateData: any = {};
      if (args.name !== undefined) updateData.name = args.name;
      if (args.price !== undefined) updateData.price = args.price;
      if (args.restaurantId !== undefined)
        updateData.restaurantId = args.restaurantId;
      if (args.categoryId !== undefined)
        updateData.categoryId = args.categoryId;

      return MenuItem.findByIdAndUpdate(args.id, updateData, { new: true });
    },

    updateCategory: async (
      _parent: any,
      args: { id: string; name?: string; description?: string },
      context: any,
    ) => {
      requireRole(context, ["admin"]);

      const updateData: any = {};
      if (args.name !== undefined) updateData.name = args.name;
      if (args.description !== undefined)
        updateData.description = args.description;

      return Category.findByIdAndUpdate(args.id, updateData, { new: true });
    },

    updateDriver: async (
      _parent: any,
      args: {
        id: string;
        name?: string;
        phone?: string;
        isAvailable?: boolean;
      },
      context: any,
    ) => {
      requireRole(context, ["admin"]);

      const updateData: any = {};
      if (args.name !== undefined) updateData.name = args.name;
      if (args.phone !== undefined) updateData.phone = args.phone;
      if (args.isAvailable !== undefined)
        updateData.isAvailable = args.isAvailable;

      return Driver.findByIdAndUpdate(args.id, updateData, { new: true });
    },

    updateOrderStatus: async (
      _parent: any,
      args: { id: string; status: string },
      context: any,
    ) => {
      requireRole(context, ["admin"]);

      return Order.findByIdAndUpdate(
        args.id,
        { status: args.status },
        { new: true },
      );
    },

    updatePaymentStatus: async (
      _parent: any,
      args: { id: string; status: "pending" | "completed" },
      context: any,
    ) => {
      requireRole(context, ["admin"]);

      return Payment.findByIdAndUpdate(
        args.id,
        { status: args.status },
        { new: true },
      );
    },

    deleteRestaurant: async (
      _parent: any,
      args: { id: string },
      context: any,
    ) => {
      requireRole(context, ["owner", "admin"]);
      return Restaurant.findByIdAndDelete(args.id);
    },

    deleteMenuItem: async (
      _parent: any,
      args: { id: string },
      context: any,
    ) => {
      requireRole(context, ["owner", "admin"]);
      return MenuItem.findByIdAndDelete(args.id);
    },
  },

  Category: {
    restaurants: async (parent: any) => {
      return Restaurant.find({ categoryIds: parent._id });
    },
  },

  Restaurant: {
    categories: async (parent: any) => {
      return Category.find({
        _id: { $in: parent.categoryIds || [] },
      });
    },

    menuItems: async (parent: any) => {
      return MenuItem.find({
        _id: { $in: parent.menuItemIds || [] },
      });
    },
  },
};
