import { Router } from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const testRoutes = Router();

testRoutes.get(
    "/profile",
    authMiddleware,
    (req, res) => {
        return res.json({
            message: "Rota protegida",
            user: req.user,
        });
    }
);

export default testRoutes;