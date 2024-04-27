import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";


const Tiene_d = db.define("Tiene_d", {
    id_dinero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_solicitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    monto:{
        type: DataTypes.INTEGER,
        
    }
})

export default Tiene_d;