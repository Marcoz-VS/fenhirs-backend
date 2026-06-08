import { User } from "./User.js";
import { Product } from "./Product.js";
import { Request } from "./Request.js";
import { Schedule } from "./Schedule.js";

User.hasMany(Request, {
    foreignKey: "clientId",
    as: "requests",
});

Request.belongsTo(User, {
    foreignKey: "clientId",
    as: "client",
});

User.hasMany(Request, {
    foreignKey: "operatorId",
    as: "operatedRequests",
});

Request.belongsTo(User, {
    foreignKey: "operatorId",
    as: "operator",
});

Product.hasMany(Request, {
    foreignKey: "productId",
});

Request.belongsTo(Product, {
    foreignKey: "productId",
});
User.hasMany(Schedule, {
    foreignKey: "clientId",
    as: "schedules",
});

Schedule.belongsTo(User, {
    foreignKey: "clientId",
    as: "client",
});

User.hasMany(Schedule, {
    foreignKey: "operatorId",
    as: "operatedSchedules",
});

Schedule.belongsTo(User, {
    foreignKey: "operatorId",
    as: "operator",
});

export {
    User,
    Product,
    Request,
    Schedule,
};