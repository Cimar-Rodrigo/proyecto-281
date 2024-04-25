import { response } from "express";
import { Solicitud, Tiene_a, Tiene_d, Tiene_p } from "../models/index_db.js";


export const addSolicitud = async (req, res = response) => {
    const {id_user, fecha_solicitud, alimentos, productos, dineros} = req.body;

    try{
        const solicitud = new Solicitud({fecha_solicitud, id_user});
        await solicitud.save();

        if(alimentos){
            // Agregar alimento
            alimentos.map((alimento) => {
                
            })
        }

    }

    catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error del servidor"
        })
    }

}
