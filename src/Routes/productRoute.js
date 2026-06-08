import { Router } from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../Controllers/productController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { roleMiddleware } from "../Middlewares/roleMiddleware.js";

const productRoutes = Router();

productRoutes.get("/", getProducts);

productRoutes.get("/:id", getProductById);

productRoutes.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    createProduct
);

productRoutes.put(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateProduct
);

productRoutes.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteProduct
);

export default productRoutes;