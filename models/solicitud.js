import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";


const Solicitud = db.define("Solicitud", {
    id_solicitud:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fecha_solicitud: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado_s: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },


})

export default Solicitud;