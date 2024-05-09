import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Participa = db.define("Participa", {
    id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    estado_p:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

export default Participa;