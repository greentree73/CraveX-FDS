import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";
import Driver from "../models/Driver.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
const MONGO_URI = "mongodb://127.0.0.1:27017/cravex";
const seed = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to DB");
        await Promise.all([
            User.deleteMany({}),
            Category.deleteMany({}),
            Restaurant.deleteMany({}),
            MenuItem.deleteMany({}),
            Driver.deleteMany({}),
            Order.deleteMany({}),
            Payment.deleteMany({}),
        ]);
        // =========================
        // USERS
        // =========================
        const password = bcrypt.hashSync("12345678", 10);
        const users = await User.insertMany([
            {
                name: "Admin User",
                email: "admin@test.com",
                phone: "1111111111",
                address: "101 Admin Lane",
                password,
                role: "admin",
            },
            {
                name: "Owner User",
                email: "owner@test.com",
                phone: "2222222222",
                address: "202 Owner Avenue",
                password,
                role: "owner",
            },
            {
                name: "Customer User",
                email: "customer@test.com",
                phone: "3333333333",
                address: "303 Customer Street",
                password,
                role: "customer",
            },
            {
                name: "Priya Sharma",
                email: "priya@test.com",
                phone: "3333334444",
                address: "12 Lake View Dr",
                password,
                role: "customer",
            },
            {
                name: "Michael Chen",
                email: "michael@test.com",
                phone: "3333335555",
                address: "45 Park Blvd",
                password,
                role: "customer",
            },
            {
                name: "Sarah Johnson",
                email: "sarah@test.com",
                phone: "3333336666",
                address: "88 Orange Ave",
                password,
                role: "customer",
            },
            {
                name: "Olivia Owner",
                email: "olivia.owner@test.com",
                phone: "2222223333",
                address: "707 Business Rd",
                password,
                role: "owner",
            },
            {
                name: "Daniel Owner",
                email: "daniel.owner@test.com",
                phone: "2222224444",
                address: "808 Enterprise St",
                password,
                role: "owner",
            },
        ]);
        const admin = users.find((u) => u.email === "admin@test.com");
        const owner = users.find((u) => u.email === "owner@test.com");
        const customer = users.find((u) => u.email === "customer@test.com");
        const priya = users.find((u) => u.email === "priya@test.com");
        const michael = users.find((u) => u.email === "michael@test.com");
        const sarah = users.find((u) => u.email === "sarah@test.com");
        console.log("✅ Users seeded");
        // =========================
        // CATEGORIES
        // =========================
        const categoryDocs = await Category.insertMany([
            { name: "Fast Food", description: "Quick meals and snacks" },
            { name: "Desserts", description: "Sweet treats and desserts" },
            { name: "Beverages", description: "Cold and hot drinks" },
            { name: "Thai", description: "Thai cuisine" },
            { name: "Chinese", description: "Chinese cuisine" },
            { name: "Indian", description: "Indian cuisine" },
            { name: "Sandwich", description: "Sandwiches and subs" },
            { name: "Pizza", description: "Pizza and slices" },
            { name: "Wings", description: "Chicken wings and combos" },
            { name: "Seafood", description: "Seafood dishes" },
            { name: "Ice Cream", description: "Ice cream and frozen desserts" },
            { name: "Bakery", description: "Baked goods and pastries" },
            { name: "Italian", description: "Italian cuisine" },
            { name: "Breakfast", description: "Breakfast items" },
            { name: "Asian", description: "Asian-inspired dishes" },
            { name: "BBQ", description: "Barbecue and grilled items" },
            { name: "Japanese", description: "Japanese cuisine" },
            { name: "Vietnamese", description: "Vietnamese cuisine" },
            { name: "Coffee", description: "Coffee and espresso drinks" },
            { name: "Smoothies", description: "Smoothies and shakes" },
        ]);
        const categoryMap = new Map(categoryDocs.map((category) => [category.name, category]));
        console.log("✅ Categories seeded");
        // =========================
        // RESTAURANTS
        // =========================
        const restaurantDocs = await Restaurant.insertMany([
            {
                name: "Pizza Hub",
                address: "123 Food Street",
                phone: "9999999999",
                categoryIds: [
                    categoryMap.get("Pizza")._id,
                    categoryMap.get("Italian")._id,
                ],
                menuItemIds: [],
            },
            {
                name: "Thai Spice Kitchen",
                address: "45 Bangkok Ave",
                phone: "8881111111",
                categoryIds: [
                    categoryMap.get("Thai")._id,
                    categoryMap.get("Asian")._id,
                ],
                menuItemIds: [],
            },
            {
                name: "Dragon Wok",
                address: "78 Chinatown Blvd",
                phone: "8882222222",
                categoryIds: [
                    categoryMap.get("Chinese")._id,
                    categoryMap.get("Asian")._id,
                ],
                menuItemIds: [],
            },
            {
                name: "Bombay Bites",
                address: "91 Curry Road",
                phone: "8883333333",
                categoryIds: [categoryMap.get("Indian")._id],
                menuItemIds: [],
            },
            {
                name: "Sub Station",
                address: "56 Sandwich Lane",
                phone: "8884444444",
                categoryIds: [
                    categoryMap.get("Sandwich")._id,
                    categoryMap.get("Fast Food")._id,
                ],
                menuItemIds: [],
            },
            {
                name: "Wing World",
                address: "22 Buffalo St",
                phone: "8885555555",
                categoryIds: [
                    categoryMap.get("Wings")._id,
                    categoryMap.get("Fast Food")._id,
                ],
                menuItemIds: [],
            },
            {
                name: "Ocean Catch",
                address: "14 Harbor Drive",
                phone: "8886666666",
                categoryIds: [categoryMap.get("Seafood")._id],
                menuItemIds: [],
            },
            {
                name: "Scoops Delight",
                address: "10 Creamery Way",
                phone: "8887777777",
                categoryIds: [
                    categoryMap.get("Ice Cream")._id,
                    categoryMap.get("Desserts")._id,
                ],
                menuItemIds: [],
            },
            {
                name: "Morning Bakery Cafe",
                address: "5 Sunrise Ave",
                phone: "8888888881",
                categoryIds: [
                    categoryMap.get("Bakery")._id,
                    categoryMap.get("Breakfast")._id,
                    categoryMap.get("Coffee")._id,
                ],
                menuItemIds: [],
            },
            {
                name: "Little Italy Pasta House",
                address: "27 Roma Street",
                phone: "8888888882",
                categoryIds: [categoryMap.get("Italian")._id],
                menuItemIds: [],
            },
            {
                name: "Tokyo Bento",
                address: "63 Sakura Blvd",
                phone: "8888888883",
                categoryIds: [
                    categoryMap.get("Japanese")._id,
                    categoryMap.get("Asian")._id,
                ],
                menuItemIds: [],
            },
            {
                name: "Saigon Bowl",
                address: "31 Pho Avenue",
                phone: "8888888884",
                categoryIds: [
                    categoryMap.get("Vietnamese")._id,
                    categoryMap.get("Asian")._id,
                ],
                menuItemIds: [],
            },
            {
                name: "Smokehouse BBQ",
                address: "44 Grill Road",
                phone: "8888888885",
                categoryIds: [categoryMap.get("BBQ")._id],
                menuItemIds: [],
            },
            {
                name: "Smoothie Stop",
                address: "18 Healthy St",
                phone: "8888888886",
                categoryIds: [
                    categoryMap.get("Smoothies")._id,
                    categoryMap.get("Beverages")._id,
                ],
                menuItemIds: [],
            },
        ]);
        const restaurantMap = new Map(restaurantDocs.map((restaurant) => [restaurant.name, restaurant]));
        console.log("✅ Restaurants seeded");
        // =========================
        // MENU ITEMS
        // =========================
        const menuItems = await MenuItem.insertMany([
            {
                name: "Margherita Pizza",
                price: 12.5,
                restaurantId: restaurantMap.get("Pizza Hub")._id,
                categoryId: categoryMap.get("Pizza")._id,
            },
            {
                name: "Pepperoni Pizza",
                price: 14.0,
                restaurantId: restaurantMap.get("Pizza Hub")._id,
                categoryId: categoryMap.get("Pizza")._id,
            },
            {
                name: "Pad Thai",
                price: 13.5,
                restaurantId: restaurantMap.get("Thai Spice Kitchen")._id,
                categoryId: categoryMap.get("Thai")._id,
            },
            {
                name: "Green Curry",
                price: 14.5,
                restaurantId: restaurantMap.get("Thai Spice Kitchen")._id,
                categoryId: categoryMap.get("Thai")._id,
            },
            {
                name: "Kung Pao Chicken",
                price: 13.0,
                restaurantId: restaurantMap.get("Dragon Wok")._id,
                categoryId: categoryMap.get("Chinese")._id,
            },
            {
                name: "Veg Fried Rice",
                price: 11.0,
                restaurantId: restaurantMap.get("Dragon Wok")._id,
                categoryId: categoryMap.get("Chinese")._id,
            },
            {
                name: "Butter Chicken",
                price: 15.5,
                restaurantId: restaurantMap.get("Bombay Bites")._id,
                categoryId: categoryMap.get("Indian")._id,
            },
            {
                name: "Paneer Tikka Masala",
                price: 14.0,
                restaurantId: restaurantMap.get("Bombay Bites")._id,
                categoryId: categoryMap.get("Indian")._id,
            },
            {
                name: "Turkey Club Sandwich",
                price: 10.5,
                restaurantId: restaurantMap.get("Sub Station")._id,
                categoryId: categoryMap.get("Sandwich")._id,
            },
            {
                name: "Veggie Sub",
                price: 9.5,
                restaurantId: restaurantMap.get("Sub Station")._id,
                categoryId: categoryMap.get("Sandwich")._id,
            },
            {
                name: "Classic Buffalo Wings",
                price: 12.0,
                restaurantId: restaurantMap.get("Wing World")._id,
                categoryId: categoryMap.get("Wings")._id,
            },
            {
                name: "BBQ Wings",
                price: 12.5,
                restaurantId: restaurantMap.get("Wing World")._id,
                categoryId: categoryMap.get("Wings")._id,
            },
            {
                name: "Grilled Salmon",
                price: 18.5,
                restaurantId: restaurantMap.get("Ocean Catch")._id,
                categoryId: categoryMap.get("Seafood")._id,
            },
            {
                name: "Fish Tacos",
                price: 13.0,
                restaurantId: restaurantMap.get("Ocean Catch")._id,
                categoryId: categoryMap.get("Seafood")._id,
            },
            {
                name: "Chocolate Ice Cream",
                price: 5.5,
                restaurantId: restaurantMap.get("Scoops Delight")._id,
                categoryId: categoryMap.get("Ice Cream")._id,
            },
            {
                name: "Vanilla Sundae",
                price: 6.0,
                restaurantId: restaurantMap.get("Scoops Delight")._id,
                categoryId: categoryMap.get("Desserts")._id,
            },
            {
                name: "Butter Croissant",
                price: 4.0,
                restaurantId: restaurantMap.get("Morning Bakery Cafe")._id,
                categoryId: categoryMap.get("Bakery")._id,
            },
            {
                name: "Cappuccino",
                price: 4.5,
                restaurantId: restaurantMap.get("Morning Bakery Cafe")._id,
                categoryId: categoryMap.get("Coffee")._id,
            },
            {
                name: "Spaghetti Alfredo",
                price: 14.5,
                restaurantId: restaurantMap.get("Little Italy Pasta House")._id,
                categoryId: categoryMap.get("Italian")._id,
            },
            {
                name: "Lasagna",
                price: 15.5,
                restaurantId: restaurantMap.get("Little Italy Pasta House")._id,
                categoryId: categoryMap.get("Italian")._id,
            },
            {
                name: "Chicken Teriyaki Bento",
                price: 14.0,
                restaurantId: restaurantMap.get("Tokyo Bento")._id,
                categoryId: categoryMap.get("Japanese")._id,
            },
            {
                name: "California Roll",
                price: 9.5,
                restaurantId: restaurantMap.get("Tokyo Bento")._id,
                categoryId: categoryMap.get("Japanese")._id,
            },
            {
                name: "Pho Bo",
                price: 13.5,
                restaurantId: restaurantMap.get("Saigon Bowl")._id,
                categoryId: categoryMap.get("Vietnamese")._id,
            },
            {
                name: "Spring Rolls",
                price: 7.5,
                restaurantId: restaurantMap.get("Saigon Bowl")._id,
                categoryId: categoryMap.get("Vietnamese")._id,
            },
            {
                name: "Smoked Brisket Plate",
                price: 17.5,
                restaurantId: restaurantMap.get("Smokehouse BBQ")._id,
                categoryId: categoryMap.get("BBQ")._id,
            },
            {
                name: "Pulled Pork Sandwich",
                price: 12.5,
                restaurantId: restaurantMap.get("Smokehouse BBQ")._id,
                categoryId: categoryMap.get("BBQ")._id,
            },
            {
                name: "Berry Blast Smoothie",
                price: 6.5,
                restaurantId: restaurantMap.get("Smoothie Stop")._id,
                categoryId: categoryMap.get("Smoothies")._id,
            },
            {
                name: "Mango Banana Smoothie",
                price: 6.0,
                restaurantId: restaurantMap.get("Smoothie Stop")._id,
                categoryId: categoryMap.get("Smoothies")._id,
            },
        ]);
        const menuItemsByRestaurant = new Map();
        for (const item of menuItems) {
            const key = item.restaurantId.toString();
            if (!menuItemsByRestaurant.has(key)) {
                menuItemsByRestaurant.set(key, []);
            }
            menuItemsByRestaurant.get(key).push(item._id);
        }
        for (const restaurant of restaurantDocs) {
            restaurant.menuItemIds =
                menuItemsByRestaurant.get(restaurant._id.toString()) || [];
            await restaurant.save();
        }
        console.log("✅ MenuItems seeded");
        // =========================
        // DRIVERS
        // =========================
        const drivers = await Driver.insertMany([
            {
                name: "John Driver",
                phone: "4444444444",
            },
            {
                name: "Emily Rider",
                phone: "4444445555",
            },
            {
                name: "Carlos Express",
                phone: "4444446666",
            },
            {
                name: "Nina Delivery",
                phone: "4444447777",
            },
        ]);
        console.log("✅ Drivers seeded");
        // =========================
        // ORDERS
        // =========================
        const order1 = await Order.create({
            status: "pending",
            totalAmount: 19.0,
            orderItems: [
                {
                    quantity: 1,
                    menuItemId: menuItems.find((m) => m.name === "Margherita Pizza")._id,
                },
                {
                    quantity: 1,
                    menuItemId: menuItems.find((m) => m.name === "Chocolate Ice Cream")
                        ._id,
                },
            ],
            restaurantId: restaurantMap.get("Pizza Hub")._id,
            customerId: customer._id,
            driverId: drivers[0]._id,
        });
        const order2 = await Order.create({
            status: "preparing",
            totalAmount: 27.5,
            orderItems: [
                {
                    quantity: 1,
                    menuItemId: menuItems.find((m) => m.name === "Butter Chicken")._id,
                },
                {
                    quantity: 1,
                    menuItemId: menuItems.find((m) => m.name === "Paneer Tikka Masala")
                        ._id,
                },
            ],
            restaurantId: restaurantMap.get("Bombay Bites")._id,
            customerId: priya._id,
            driverId: drivers[1]._id,
        });
        const order3 = await Order.create({
            status: "delivered",
            totalAmount: 23.0,
            orderItems: [
                {
                    quantity: 1,
                    menuItemId: menuItems.find((m) => m.name === "Chicken Teriyaki Bento")._id,
                },
                {
                    quantity: 1,
                    menuItemId: menuItems.find((m) => m.name === "California Roll")._id,
                },
            ],
            restaurantId: restaurantMap.get("Tokyo Bento")._id,
            customerId: michael._id,
            driverId: drivers[2]._id,
        });
        const order4 = await Order.create({
            status: "ready",
            totalAmount: 20.0,
            orderItems: [
                {
                    quantity: 1,
                    menuItemId: menuItems.find((m) => m.name === "Pho Bo")._id,
                },
                {
                    quantity: 1,
                    menuItemId: menuItems.find((m) => m.name === "Spring Rolls")._id,
                },
            ],
            restaurantId: restaurantMap.get("Saigon Bowl")._id,
            customerId: sarah._id,
            driverId: drivers[3]._id,
        });
        const order5 = await Order.create({
            status: "out_for_delivery",
            totalAmount: 18.5,
            orderItems: [
                {
                    quantity: 1,
                    menuItemId: menuItems.find((m) => m.name === "Classic Buffalo Wings")
                        ._id,
                },
                {
                    quantity: 1,
                    menuItemId: menuItems.find((m) => m.name === "BBQ Wings")._id,
                },
            ],
            restaurantId: restaurantMap.get("Wing World")._id,
            customerId: customer._id,
            driverId: drivers[0]._id,
        });
        console.log("✅ Orders seeded");
        // =========================
        // PAYMENTS
        // =========================
        await Payment.insertMany([
            {
                amount: 19.0,
                status: "pending",
                method: "credit_card",
                orderId: order1._id,
            },
            {
                amount: 27.5,
                status: "completed",
                method: "cash",
                orderId: order2._id,
            },
            {
                amount: 23.0,
                status: "completed",
                method: "credit_card",
                orderId: order3._id,
            },
            {
                amount: 20.0,
                status: "pending",
                method: "cash",
                orderId: order4._id,
            },
            {
                amount: 18.5,
                status: "pending",
                method: "credit_card",
                orderId: order5._id,
            },
        ]);
        console.log("✅ Payments seeded");
        console.log("🎉 Seeding completed successfully");
        process.exit();
    }
    catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
};
seed();
