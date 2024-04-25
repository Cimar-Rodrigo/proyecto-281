import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";


const Contiene_p = db.define("Contiene_p", {
    id_donacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    monto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

export default Contiene_p;