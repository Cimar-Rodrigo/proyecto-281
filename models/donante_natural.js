import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";
import e from "express";

const Donante_natural = db.define("Donante_natural", {
    id_user:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },

    direccion_dn:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitud_dn:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitud_dn:{
        type: DataTypes.STRING,
        allowNull: false,
    },

})

export default Donante_natural;