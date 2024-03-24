import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";


const Solicitud = db.define("Solicitud", {
    Id_solicitud:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fecha_solicitud: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userV: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userR: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default Solicitud;