import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";


const Alimento = db.define("Alimento", {
    id_alimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_a: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad_a: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medida_unitaria_a: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    caducidad_a: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_donacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default Alimento;