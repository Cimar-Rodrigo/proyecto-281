import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Encargado_receptor = db.define("Encargado_receptor", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    puesto_trabajo_er: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_org_rec: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

export default Encargado_receptor;