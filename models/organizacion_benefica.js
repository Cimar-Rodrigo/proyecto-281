import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Organizacion_benefica = db.define("Organizacion_benefica", {
    id_org_ben: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nombre_ob:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion_ob: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_b: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitud_ob: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitud_ob: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nit_ob: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default Organizacion_benefica;