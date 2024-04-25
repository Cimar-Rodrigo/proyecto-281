import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";


const Tiene_a = db.define("Tiene_a", {
    id_alimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    cantidad_a:{
        type: DataTypes.INTEGER,
        
    }
})

export default Tiene_a;