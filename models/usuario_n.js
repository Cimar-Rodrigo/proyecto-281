import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Usuario_n = db.define("Usuario_n", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
})

export default Usuario_n;