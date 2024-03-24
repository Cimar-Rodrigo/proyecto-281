import { DataTypes } from "sequelize"; 
import db from "../database/connection.js";

const Receptor = db.define("Receptor", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
})

export default Receptor;