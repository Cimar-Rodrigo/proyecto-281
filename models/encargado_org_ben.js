import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Encargado_org_ben = db.define("Encargado_org_ben", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    puesto_trabajo_ob: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_org_ben: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

export default Encargado_org_ben;