import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Responsable_recojo = db.define("Responsable_recojo", {
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
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado_c: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
})

export default Responsable_recojo