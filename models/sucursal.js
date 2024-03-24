import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Sucursal = db.define("Sucursal", {
        id_sucursal:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre_s: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitud_s: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        longitud_s: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion_s: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_org_don: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descripcion_s: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

export default Sucursal;