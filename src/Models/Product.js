import { DataTypes } from "sequelize";
import { sequelize } from "../Config/database.js";

export const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.ENUM(
            "ARMA",
            "MUNICAO",
            "CURSO"
        ),
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.TEXT,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: "products",
    timestamps: true,
});