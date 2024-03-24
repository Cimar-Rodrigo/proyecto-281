import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Donacion = db.define("Donacion", {
    id_donacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    fecha_d: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userD: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userV:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default Donacion;