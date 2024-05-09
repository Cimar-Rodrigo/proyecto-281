import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Postulacion_recojo = db.define("Postulacion_recojo", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_donacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false 
    },
    estado_p:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Postulacion_recojo