import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Tiene_p = db.define("Tiene_p", {
    
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_solicitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_p:{
        type: DataTypes.INTEGER,
        
    }
    
})

export default Tiene_p;