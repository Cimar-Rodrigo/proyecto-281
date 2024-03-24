import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Organizacion_donante = db.define("Organizacion_donante", {
    id_org_don:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre_od: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_od: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitud_od: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitud_od: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion_od: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nit_od: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default Organizacion_donante;