import dotenv from "dotenv";

dotenv.config();

import express from "express";
import getPort from "get-port";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs";
import path from "path";

// Routes
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import shopRoutes from "./routes/shopRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// API Routes
app.use("/api/shop", shopRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes); // Assuming you have user routes

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ error: "API endpoint not found" });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle EADDRINUSE (Address in Use) Error Gracefully
server.on("error", async (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.log(`⚠️ Port ${PORT} is in use, trying another one...`);

    // Find an available 4-digit port in the range 3000-9999
    const newPort = await getPort({
      port: Math.floor(Math.random() * (9999 - 3000 + 1)) + 3000,
    });

    const newServer = app.listen(newPort, () => {
      console.log(`✅ Server started on http://localhost:${newPort}`);
      updateEnvFile(newPort);
    });
  }
});

const updateEnvFile = (port: number) => {
  const envPath = path.join(__dirname, "../../client/.env"); // Adjust path based on project structure
  const envContent = `VITE_APP_API_URL=http://localhost:${port}`;
  fs.writeFileSync(envPath, envContent);
};
