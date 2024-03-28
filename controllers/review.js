import { response } from "express";
import { Usuario, Persona, Donante, Voluntario } from "../models/index_db.js";
import { clasificarDonantes, clasificarVoluntarios } from "../helpers/clasification.js";


export const mostrar_usuarios = async (req, res = response) => {
    try {
        //const usuarios = await Usuario.findAll({
        //    attributes: ['id_user', 'user', 'estado'],
        //    where: {
        //        estado: 0
        //    }
        //
        //})

        // console.log(usuarios)

        const voluntarios = await Voluntario.findAll({
            include:[
                {
                    model: Usuario,
                    include: {
                        model: Persona
                    }
                }
            ]
        })

        
        const donantes = await Donante.findAll({
        
            include: [
                {
                    model: Usuario,
                    include: {
                        model:Persona
                    }
                }
            ]
        })

        const jVoluntarios = clasificarVoluntarios(voluntarios)
        const jDonantes = clasificarDonantes(donantes)
        ////console.log(voluntarios)
        
        //
        // console.log(jVoluntarios)
        
        const body = {
            voluntarios:jVoluntarios,
            donantes: jDonantes
        }
        res.json(body)

        //res.json({Users: usuarios})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}