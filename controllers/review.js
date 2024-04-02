import { response } from "express";
import { Usuario } from "../models/index_db.js";
import { clasificarDonantesNaturales, clasificarEncargadosOrganizacionBenefica, clasificarEncargadosOrganizacionDonante, clasificarEncargadosOrganizacionReceptora, clasificarReceptoresNaturales, clasificarVoluntarios } from "../helpers/clasification.js";
import { clasificarDonantesNaturalesA, clasificarEncargadosOrganizacionBeneficaA, clasificarEncargadosOrganizacionDonanteA, clasificarReceptoresNaturalesA, clasificarVoluntariosA, clasificarEncargadosOrganizacionReceptoraA } from "../helpers/clasificationAll.js";


export const mostrar_usuarios_pendientes = async (req, res = response) => {
    try {
        //const usuarios = await Usuario.findAll({
        //    attributes: ['id_user', 'user', 'estado'],
        //    where: {
        //        estado: 0
        //    }
        //
        //})

        // console.log(usuarios)
          
        

        const jVoluntarios = await clasificarVoluntarios()
        const jDonantesNaturales = await clasificarDonantesNaturales()
        const jEncargadosOrganizacionesDonantes = await clasificarEncargadosOrganizacionDonante();
        const jReceptoresNaturales = await clasificarReceptoresNaturales();
        const jEncargadosOrganicacionesBeneficas = await clasificarEncargadosOrganizacionBenefica();
        const jEncargadosOrganizacionesReceptoras = await clasificarEncargadosOrganizacionReceptora();
        //
        // console.log(jVoluntarios)
        
        const body = {
            voluntarios:jVoluntarios,
            donantes_naturales: jDonantesNaturales,
            encargados_donantes: jEncargadosOrganizacionesDonantes,
            receptores_naturales: jReceptoresNaturales,
            encargados_organizacion_benefica : jEncargadosOrganicacionesBeneficas,
            encargados_receptores: jEncargadosOrganizacionesReceptoras

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

export const validar_usuario = async (req, res = response) => {

    const { id_user, estado } = req.body

    try {
        await Usuario.update({estado: estado}, {
            where: {
                id_user: id_user
            }
        })

        res.json({
            ok: true,
            msg: 'Usuario actualizado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
        console.log(error)        
    }
}


export const mostrar_todos_usuarios = async (req, res = response) => {
    try {
        

        const jVoluntarios = await clasificarVoluntariosA()
        const jDonantesNaturales = await clasificarDonantesNaturalesA()
        const jEncargadosOrganizacionesDonantes = await clasificarEncargadosOrganizacionDonanteA();
        const jReceptoresNaturales = await clasificarReceptoresNaturalesA();
        const jEncargadosOrganicacionesBeneficas = await clasificarEncargadosOrganizacionBeneficaA();
        const jEncargadosOrganizacionesReceptoras = await clasificarEncargadosOrganizacionReceptoraA();
        
        const body = {
            voluntarios:jVoluntarios,
            donantes_naturales: jDonantesNaturales,
            encargados_donantes: jEncargadosOrganizacionesDonantes,
            receptores_naturales: jReceptoresNaturales,
            encargados_organizacion_benefica : jEncargadosOrganicacionesBeneficas,
            encargados_receptores: jEncargadosOrganizacionesReceptoras

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