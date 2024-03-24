import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Entrega = db.define("Entrega", {
    id_entrega:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userV: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userR: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_d: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    entrega_conforme: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recibi_conforme: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export default Entrega;