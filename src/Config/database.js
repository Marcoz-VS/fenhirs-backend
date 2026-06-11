import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

export async function testConnection() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log("Banco conectado com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar no banco:");
        console.error(error);
    }
}