import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Contiene_d = db.define("Contiene_d", {
    id_donacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_dinero: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    monto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

export default Contiene_d;