import { DataTypes } from "sequelize";
import { sequelize } from "../Config/database.js";

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(
            "CLIENT",
            "OPERATOR",
            "ADMIN"
        ),
        defaultValue: "CLIENT",
    },
    rg: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cac: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: "users",
    timestamps: true,
});