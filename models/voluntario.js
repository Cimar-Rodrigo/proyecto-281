import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Voluntario = db.define("Voluntario", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    turno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export default Voluntario;