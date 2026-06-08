import { DataTypes } from "sequelize";
import { sequelize } from "../Config/database.js";

export const Request = sequelize.define("Request", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM(
            "PENDING",
            "APPROVED",
            "REJECTED"
        ),
        defaultValue: "PENDING",
    },
    observation: {
        type: DataTypes.TEXT,
    },
    operatorMessage: {
        type: DataTypes.TEXT,
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
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
    tableName: "requests",
    timestamps: true,
});