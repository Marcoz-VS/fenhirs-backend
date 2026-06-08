import { Router } from "express";
import {
    createRequest,
    getMyRequests,
    getAllRequests,
    updateRequestStatus
} from "../Controllers/requestController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { roleMiddleware } from "../Middlewares/roleMiddleware.js";

const requestRoutes = Router();

requestRoutes.post(
    "/",
    authMiddleware,
    roleMiddleware("CLIENT", "ADMIN"),
    createRequest
);

requestRoutes.get(
    "/my",
    authMiddleware,
    getMyRequests
);

requestRoutes.get(
    "/",
    authMiddleware,
    roleMiddleware("OPERATOR", "ADMIN"),
    getAllRequests
);

requestRoutes.patch(
    "/:id/status",
    authMiddleware,
    roleMiddleware("OPERATOR", "ADMIN"),
    updateRequestStatus
);

export default requestRoutes;