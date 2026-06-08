import { Router } from "express";
import {
    createSchedule,
    getMySchedules,
    getAllSchedules,
    updateScheduleStatus
} from "../Controllers/scheduleController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { roleMiddleware } from "../Middlewares/roleMiddleware.js";

const scheduleRoutes = Router();

scheduleRoutes.post(
    "/",
    authMiddleware,
    roleMiddleware("CLIENT", "ADMIN"),
    createSchedule
);

scheduleRoutes.get(
    "/my",
    authMiddleware,
    getMySchedules
);

scheduleRoutes.get(
    "/",
    authMiddleware,
    roleMiddleware("OPERATOR", "ADMIN"),
    getAllSchedules
);

scheduleRoutes.patch(
    "/:id/status",
    authMiddleware,
    roleMiddleware("OPERATOR", "ADMIN"),
    updateScheduleStatus
);

export default scheduleRoutes;