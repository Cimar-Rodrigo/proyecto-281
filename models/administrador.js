import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";


const Administrador = db.define("Administrador", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
})

export default Administrador;