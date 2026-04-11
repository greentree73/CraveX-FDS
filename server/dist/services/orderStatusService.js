import Order from "../models/Order.js";
const STATUS_FLOW = [
    "pending",
    "preparing",
    "ready",
    "out_for_delivery",
    "delivered",
];
// minutes between status changes
const STATUS_DELAY_MS = 1 * 60 * 1000; // 1 minute
export const startOrderStatusUpdater = () => {
    setInterval(async () => {
        try {
            const cutoffTime = new Date(Date.now() - STATUS_DELAY_MS);
            const orders = await Order.find({
                status: { $in: ["pending", "preparing", "ready", "out_for_delivery"] },
                updatedAt: { $lte: cutoffTime },
            });
            for (const order of orders) {
                const currentIndex = STATUS_FLOW.indexOf(order.status);
                if (currentIndex === -1)
                    continue;
                const nextStatus = STATUS_FLOW[currentIndex + 1];
                if (!nextStatus)
                    continue;
                order.status = nextStatus;
                await order.save();
                console.log(`📦 Order ${order._id} updated to ${nextStatus}`);
            }
        }
        catch (err) {
            console.error("❌ Order status update failed:", err);
        }
    }, 10000); // check every 10 seconds
};
