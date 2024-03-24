import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Persona = db.define("Persona", {
    ci: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ap_paterno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ap_materno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_nac: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    nro_cel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Persona;