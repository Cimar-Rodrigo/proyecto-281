import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";


const Tiene_a = db.define("Tiene_a", {
    Id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_alimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
})

export default Tiene_a;