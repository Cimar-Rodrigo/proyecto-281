import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Donante = db.define("Donante", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
})

export default Donante;