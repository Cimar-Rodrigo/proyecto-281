import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Encargado_donante = db.define("Encargado_donante", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    puesto_trabajo_d: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_org_don: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

export default Encargado_donante;