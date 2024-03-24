import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Receptor_natural = db.define("Receptor_natural", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    descipcion_rn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion_rn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitud_rn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitud_rn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export default Receptor_natural;