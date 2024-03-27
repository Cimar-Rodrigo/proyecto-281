import { DataTypes } from "sequelize";
import db from "../database/connection.js";

const Usuario = db.define("Usuario", {
    id_user:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    ci:{
        type: DataTypes.INTEGER,
        
        allowNull: false,
    },
    estado:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default Usuario;