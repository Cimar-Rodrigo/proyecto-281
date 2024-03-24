import { Sequelize } from "sequelize";


const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});

export default db;