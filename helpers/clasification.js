export const clasificarVoluntarios = (voluntarios) => {

    let jVoluntarios = []

    voluntarios.map( (voluntario) =>{
        if(voluntario.dataValues.Usuario.dataValues.estado === 0){
            jVoluntarios = [...jVoluntarios, {
                id_user: voluntario.dataValues.id_user,
                user: voluntario.dataValues.Usuario.dataValues.user,
                nombre: voluntario.dataValues.Usuario.Persona.dataValues.nombre,
                correo: voluntario.dataValues.Usuario.Persona.dataValues.correo
            }]
        }
        // console.log(voluntario.dataValues.Usuario.Persona.dataValues.nombre)
    } )


    return jVoluntarios
}

export const clasificarDonantes = (donantes) => {
    let jDonantes = []

    donantes.map( (donante) => {
        if(donante.dataValues.Usuario.dataValues.estado === 0){
            jDonantes = [...jDonantes, {
                id_user: donante.dataValues.id_user,
                user: donante.dataValues.Usuario.dataValues.user,
                nombre: donante.dataValues.Usuario.Persona.dataValues.nombre,
                correo: donante.dataValues.Usuario.Persona.dataValues.correo
            }]
        }
    })
    return jDonantes
}