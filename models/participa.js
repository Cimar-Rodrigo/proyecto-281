import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Participa = db.define("Participa", {
    Id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
})

export default Participa;