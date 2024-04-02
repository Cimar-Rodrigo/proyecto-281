import {Voluntario, Usuario, Persona, Donante_natural, Encargado_donante, Organizacion_donante, Receptor_natural, Organizacion_benefica, Organizacion_receptora, Encargado_org_ben, Encargado_receptor} from '../models/index_db.js'

export const clasificarVoluntariosA = async () => {
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
    let jVoluntarios = []
    
    voluntarios.map( (voluntario) =>{
        if(voluntario.dataValues.Usuario.dataValues.estado === (1 || 2)){
                //console.log(voluntarios)
                jVoluntarios = [...jVoluntarios, {
                    id_user: voluntario.dataValues.id_user,
                    user: voluntario.dataValues.Usuario.dataValues.user,
                    nombre: voluntario.dataValues.Usuario.Persona.dataValues.nombre,
                    apellido_pat: voluntario.dataValues.Usuario.Persona.dataValues.ap_paterno,
                    apellido_mat: voluntario.dataValues.Usuario.Persona.dataValues.ap_materno,
                    correo: voluntario.dataValues.Usuario.Persona.dataValues.correo
                }]
            }
            // console.log(voluntario.dataValues.Usuario.Persona.dataValues.nombre)
        } )       
    //console.log(jVoluntarios)
    return jVoluntarios
}

export const clasificarDonantesNaturalesA = async () => {
    const donantesNaturales = await Donante_natural.findAll({
        
        include: [
            {
                model: Usuario,
                include: {
                    model:Persona
                }
            }
        ]
    })
    let jDonantesNaturales = []

    donantesNaturales.map( (donanteNatural) => {
        if(donanteNatural.dataValues.Usuario.dataValues.estado === (1 || 2)){
            jDonantesNaturales = [...jDonantesNaturales, {
                id_user: donanteNatural.dataValues.id_user,
                user: donanteNatural.dataValues.Usuario.dataValues.user,
                nombre: donanteNatural.dataValues.Usuario.Persona.dataValues.nombre,
                apellido_pat: donanteNatural.dataValues.Usuario.Persona.dataValues.ap_paterno,
                apellido_mat: donanteNatural.dataValues.Usuario.Persona.dataValues.ap_materno,
                correo: donanteNatural.dataValues.Usuario.Persona.dataValues.correo
            }]
        }
    })
    return jDonantesNaturales
}

export const clasificarEncargadosOrganizacionDonanteA = async () => {
    const encargadosOrganizacionDonante = await Encargado_donante.findAll({
        include: [
            {
                model: Usuario,
                include: {
                    model: Persona
                }
            },
            {
                model: Organizacion_donante
            }
        ]
    })

    let jEncargadosDonantes = []

    encargadosOrganizacionDonante.map( (encargado) => {
        if(encargado.dataValues.Usuario.dataValues.estado === (1 || 2)){
            jEncargadosDonantes = [...jEncargadosDonantes, {
                id_user: encargado.dataValues.Usuario.id_user,
                user: encargado.dataValues.Usuario.user,
                nombre: encargado.dataValues.Usuario.Persona.dataValues.nombre,
                apellido_pat: encargado.dataValues.Usuario.Persona.dataValues.ap_paterno,
                apellido_mat: encargado.dataValues.Usuario.Persona.dataValues.ap_materno,
                correo: encargado.dataValues.Usuario.Persona.dataValues.correo,
                nombre_od: encargado.dataValues.Organizacion_donante.dataValues.nombre_od,
                direccion_od: encargado.dataValues.Organizacion_donante.dataValues. direccion_od,
                nit_od: encargado.dataValues.Organizacion_donante.dataValues.nit_od
            }]
        }
    })

    return jEncargadosDonantes

}

export const clasificarReceptoresNaturalesA = async () => {
    const receptoresNaturales = await Receptor_natural.findAll({
        include: [
            {
                model: Usuario,
                include: {
                    model: Persona
                }
            }
        ]
    })

    let jReceptoresNaturales = []

    receptoresNaturales.map( (receptorNatural) => {
        if(receptorNatural.dataValues.Usuario.dataValues.estado === (1 || 2)){
            jReceptoresNaturales = [...jReceptoresNaturales, {
                id_user: receptorNatural.dataValues.id_user,
                user: receptorNatural.dataValues.Usuario.dataValues.user,
                nombre: receptorNatural.dataValues.Usuario.Persona.dataValues.nombre,
                apellido_pat: receptorNatural.dataValues.Usuario.Persona.dataValues.ap_paterno,
                apellido_mat: receptorNatural.dataValues.Usuario.Persona.dataValues.ap_materno,
                correo: receptorNatural.dataValues.Usuario.Persona.dataValues.correo
            }]
        }
    })

    return jReceptoresNaturales
}

export const clasificarEncargadosOrganizacionBeneficaA = async () => {
    const encargadosOrganizacionBenefica = await Encargado_org_ben.findAll({
        include: [
            {
                model: Usuario,
                include: {
                    model: Persona
                }
            },
            {
                model: Organizacion_benefica
            }
        ]
    })

    let jEncargadosOganizacionBenefica = []

    encargadosOrganizacionBenefica.map( (encargado) => {
        if(encargado.dataValues.Usuario.dataValues.estado === (1 || 2)){
            jEncargadosOganizacionBenefica = [...jEncargadosOganizacionBenefica, {
                id_user: encargado.dataValues.Usuario.id_user,
                user: encargado.dataValues.Usuario.user,
                nombre: encargado.dataValues.Usuario.Persona.dataValues.nombre,
                apellido_pat: encargado.dataValues.Usuario.Persona.dataValues.ap_paterno,
                apellido_mat: encargado.dataValues.Usuario.Persona.dataValues.ap_materno,
                correo: encargado.dataValues.Usuario.Persona.dataValues.correo,
                nombre_od: encargado.dataValues.Organizacion_benefica.dataValues.nombre_ob,
                direccion_od: encargado.dataValues.Organizacion_benefica.dataValues. direccion_b,
                nit_od: encargado.dataValues.Organizacion_benefica.dataValues.nit_ob
            }]
        }
    })

    return jEncargadosOganizacionBenefica
}


export const clasificarEncargadosOrganizacionReceptoraA = async () => {
    const encargadosOrganizacionReceptora = await Encargado_receptor.findAll({
        include: [
            {
                model: Usuario,
                include: {
                    model: Persona
                }
            },
            {
                model: Organizacion_receptora
            }
        ]
    })

    let jEncargadosReceptores = []

    encargadosOrganizacionReceptora.map( (encargado) => {
        if(encargado.dataValues.Usuario.dataValues.estado === (1 || 2)){
            jEncargadosReceptores = [...jEncargadosReceptores, {
                id_user: encargado.dataValues.Usuario.id_user,
                user: encargado.dataValues.Usuario.user,
                nombre: encargado.dataValues.Usuario.Persona.dataValues.nombre,
                apellido_pat: encargado.dataValues.Usuario.Persona.dataValues.ap_paterno,
                apellido_mat: encargado.dataValues.Usuario.Persona.dataValues.ap_materno,
                correo: encargado.dataValues.Usuario.Persona.dataValues.correo,
                nombre_od: encargado.dataValues.Organizacion_receptora.dataValues.nombre_or,
                direccion_od: encargado.dataValues.Organizacion_receptora.dataValues. direccion_or,
                nit_od: encargado.dataValues.Organizacion_receptora.dataValues.nit_or
            }]
        }
    })

    return jEncargadosReceptores
}