import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Responsable_entrega = db.define("Responsable_entrega", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_solicitud: {
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

export default Responsable_entrega