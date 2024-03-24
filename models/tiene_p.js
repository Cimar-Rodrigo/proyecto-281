import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Tiene_p = db.define("Tiene_p", {
    Id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
})

export default Tiene_p;