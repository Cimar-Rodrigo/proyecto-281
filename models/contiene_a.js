import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Contiene_a = db.define("Contiene_a", {
    id_donacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_alimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    monto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    caducidad_a: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})

export default Contiene_a;