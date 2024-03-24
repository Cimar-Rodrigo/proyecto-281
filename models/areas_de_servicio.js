import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Areas_de_servicio = db.define("Areas_de_servicio", {
    id_area_serv: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nombre_as: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitud_as: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitud_as: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion_as: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_org_ben: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion_as: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export default Areas_de_servicio;