import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./Config/database.js";
import "./Models/index.js"
import authRoutes from "./Routes/authRoute.js"
import testRoutes from "./Routes/testRoute.js";
import productRoutes from "./Routes/productRoute.js";
import requestRoutes from "./Routes/requestRoute.js";
import scheduleRoutes from "./Routes/scheduleRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/test", testRoutes);

app.use("/products", productRoutes);

app.use("/requests", requestRoutes);

app.use("/schedules", scheduleRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date()
    });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    await testConnection();

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}

startServer();