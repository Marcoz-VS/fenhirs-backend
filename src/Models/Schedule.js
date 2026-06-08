import { DataTypes } from "sequelize";
import { sequelize } from "../Config/database.js";

export const Schedule = sequelize.define("Schedule", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    scheduleDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    scheduleHour: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    booth: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(
            "PENDING",
            "APPROVED",
            "REJECTED",
            "COMPLETED"
        ),
        defaultValue: "PENDING",
    },
    observation: {
        type: DataTypes.TEXT,
    },
    operatorMessage: {
        type: DataTypes.TEXT,
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    operatorId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    tableName: "schedules",
    timestamps: true,
});