import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Dinero = db.define("Dinero", {
    id_dinero: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    monto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cambio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_donacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Dinero;