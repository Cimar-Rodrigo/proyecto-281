import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";


const Tiene_d = db.define("Tiene_d", {
    Id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_dinero: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
})

export default Tiene_d;