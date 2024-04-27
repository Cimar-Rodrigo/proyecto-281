import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";


const Tiene_a = db.define("Tiene_a", {
    id_alimento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_solicitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_a:{
        type: DataTypes.INTEGER,
        
    },
    
})
AcademyModule.removeAttribute('id');
export default Tiene_a;