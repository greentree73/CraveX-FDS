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
const requireAuth = (context) => {
    if (!context.user) {
        throw new Error("Not authenticated");
    }
};
const requireRole = (context, roles) => {
    requireAuth(context);
    if (!roles.includes(context.user.role)) {
        throw new Error("Not authorized");
    }
};
export const resolvers = {
    Query: {
        users: async (_parent, _args, context) => {
            requireRole(context, ["admin"]);
            return User.find();
        },
        categories: async () => {
            return Category.find();
        },
        restaurants: async () => {
            return Restaurant.find();
        },
        menuItems: async (_parent, args) => {
            return MenuItem.find({ restaurantId: args.restaurantId });
        },
        orders: async (_parent, _args, context) => {
            requireAuth(context);
            if (context.user.role === "admin") {
                return Order.find();
            }
            return Order.find({ customerId: context.user.id });
        },
    },
    Mutation: {
        register: async (_parent, args) => {
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
            const token = jwt.sign({ id: user._id.toString(), role: user.role }, JWT_SECRET, { expiresIn: "7d" });
            return {
                token,
                user,
            };
        },
        login: async (_parent, args) => {
            const email = args.email.trim().toLowerCase();
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("Invalid credentials");
            }
            const valid = bcrypt.compareSync(args.password, user.password);
            if (!valid) {
                throw new Error("Invalid credentials");
            }
            const token = jwt.sign({ id: user._id.toString(), role: user.role }, JWT_SECRET, { expiresIn: "7d" });
            return {
                token,
                user,
            };
        },
        addRestaurant: async (_parent, args, context) => {
            requireRole(context, ["owner", "admin"]);
            return Restaurant.create({
                name: args.name,
                address: args.address,
                phone: args.phone,
                categoryIds: args.categoryIds || [],
                menuItemIds: args.menuItemIds || [],
            });
        },
        addMenuItem: async (_parent, args, context) => {
            requireRole(context, ["owner", "admin"]);
            return MenuItem.create({
                name: args.name,
                price: args.price,
                restaurantId: args.restaurantId,
                categoryId: args.categoryId,
            });
        },
        addCategory: async (_parent, args, context) => {
            requireRole(context, ["admin"]);
            return Category.create({
                name: args.name,
                description: args.description,
            });
        },
        addDriver: async (_parent, args, context) => {
            requireRole(context, ["admin"]);
            return Driver.create({
                name: args.name,
                phone: args.phone,
            });
        },
        addPayment: async (_parent, args, context) => {
            return Payment.create({
                orderId: args.orderId,
                amount: args.amount,
                status: args.status,
                method: args.method,
            });
        },
        placeOrder: async (_parent, args, context) => {
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
        updateRestaurant: async (_parent, args, context) => {
            requireRole(context, ["owner", "admin"]);
            const updateData = {};
            if (args.name !== undefined)
                updateData.name = args.name;
            if (args.address !== undefined)
                updateData.address = args.address;
            if (args.phone !== undefined)
                updateData.phone = args.phone;
            if (args.categoryIds !== undefined)
                updateData.categoryIds = args.categoryIds;
            if (args.menuItemIds !== undefined)
                updateData.menuItemIds = args.menuItemIds;
            return Restaurant.findByIdAndUpdate(args.id, updateData, { new: true });
        },
        updateMenuItem: async (_parent, args, context) => {
            requireRole(context, ["owner", "admin"]);
            const updateData = {};
            if (args.name !== undefined)
                updateData.name = args.name;
            if (args.price !== undefined)
                updateData.price = args.price;
            if (args.restaurantId !== undefined)
                updateData.restaurantId = args.restaurantId;
            if (args.categoryId !== undefined)
                updateData.categoryId = args.categoryId;
            return MenuItem.findByIdAndUpdate(args.id, updateData, { new: true });
        },
        updateCategory: async (_parent, args, context) => {
            requireRole(context, ["admin"]);
            const updateData = {};
            if (args.name !== undefined)
                updateData.name = args.name;
            if (args.description !== undefined)
                updateData.description = args.description;
            return Category.findByIdAndUpdate(args.id, updateData, { new: true });
        },
        updateDriver: async (_parent, args, context) => {
            requireRole(context, ["admin"]);
            const updateData = {};
            if (args.name !== undefined)
                updateData.name = args.name;
            if (args.phone !== undefined)
                updateData.phone = args.phone;
            if (args.isAvailable !== undefined)
                updateData.isAvailable = args.isAvailable;
            return Driver.findByIdAndUpdate(args.id, updateData, { new: true });
        },
        updateOrderStatus: async (_parent, args, context) => {
            requireRole(context, ["admin"]);
            return Order.findByIdAndUpdate(args.id, { status: args.status }, { new: true });
        },
        updatePaymentStatus: async (_parent, args, context) => {
            requireRole(context, ["admin"]);
            return Payment.findByIdAndUpdate(args.id, { status: args.status }, { new: true });
        },
        deleteRestaurant: async (_parent, args, context) => {
            requireRole(context, ["owner", "admin"]);
            return Restaurant.findByIdAndDelete(args.id);
        },
        deleteMenuItem: async (_parent, args, context) => {
            requireRole(context, ["owner", "admin"]);
            return MenuItem.findByIdAndDelete(args.id);
        },
    },
    Order: {
        restaurant: async (parent) => {
            return await Restaurant.findById(parent.restaurantId);
        },
    },
    Category: {
        restaurants: async (parent) => {
            return Restaurant.find({ categoryIds: parent._id });
        },
    },
    Restaurant: {
        categories: async (parent) => {
            return Category.find({
                _id: { $in: parent.categoryIds || [] },
            });
        },
        menuItems: async (parent) => {
            return MenuItem.find({
                _id: { $in: parent.menuItemIds || [] },
            });
        },
    },
};
