import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";


import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";


import { startOrderStatusUpdater } from "./services/orderStatusService.js";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_change_me";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 4000;

async function startServer() {
  /* =======================
     DB CONNECTION
  ======================= */
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/cravex";

  await mongoose.connect(mongoUri);
  console.log("📊 Connected to MongoDB:", mongoUri);

  startOrderStatusUpdater(); 
  console.log("⏱️ Order status updater started");

  /* =======================
     APOLLO SERVER
  ======================= */
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await server.start();

  const app = express();

  const clientBuildPath = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientBuildPath));

  app.get(/^(?!\/graphql).*/, (_req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });

  /* =======================
     BASIC ROUTES
  ======================= */

  // app.get("/", (_req, res) => {
  //   res.status(200).json({
  //     message: "Welcome to CraveX 🚀",
  //   });
  // });

  // app.get("/health", (_req, res) => {
  //   res.status(200).json({
  //     status: "ok",
  //     service: "cravex-api",
  //   });
  // });

  /* =======================
     GRAPHQL ENDPOINT
  ======================= */
 
  app.use(
    "/graphql",
    cors({
      origin: (origin: any, callback: any) => {
        if (!origin) return callback(null, true);

        const ok = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
        callback(null, ok);
      },
      credentials: true,
    }),
    express.json(),

    expressMiddleware(server, {
      context: async ({ req }) => {


        const auth = req.headers.authorization || "";

        // No token
        if (!auth.startsWith("Bearer ")) {
          return { user: null };
        }

        const token = auth.slice(7);

        try {
          const payload = jwt.verify(token, JWT_SECRET) as {
            id: string;
            role: "customer" | "owner" | "admin";
          };

          return {
            user: {
              id: payload.id,
              role: payload.role,
            },
          };
        } catch (err) {
          console.log("JWT Error:", err);
          return { user: null };
        }
      },
    }),
  );

  /* =======================
     START SERVER
  ======================= */

  app.listen(PORT, () => {
    console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("❌ Server failed to start:", error);
  process.exit(1);
});
