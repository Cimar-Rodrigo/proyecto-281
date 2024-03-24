import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Organizacion_receptora = db.define("Organizacion_receptora", {
    id_org_rec: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre_or:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion_or: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_or: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitud_or: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitud_or: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nit_or: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default Organizacion_receptora;