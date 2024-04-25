import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Producto = db.define("Producto", {
    id_producto:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre_p: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_p: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad_p: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medida_unitaria_p: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default Producto;