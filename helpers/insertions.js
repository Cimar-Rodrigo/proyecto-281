import { Donante, Donante_natural, Organizacion_donante, Encargado_donante, Encargado_org_ben, Encargado_receptor, Receptor, Receptor_natural, Voluntario } from '../models/index_db.js'


export const insert_donante = async (direccion_dn, latitud_dn, longitud_dn, id_user) => {
    await new Donante({id_user}).save();
    await new Donante_natural({ id_user, direccion_dn, latitud_dn, longitud_dn }).save()
}

export const insert_orgDonante = async (nombre_od, tipo_od, latitud_od, longitud_od , direccion_od, nit_od, puesto_trabajo_d, id_user) => {
    await new Donante({id_user}).save()
    const orgDon = new Organizacion_donante({nombre_od, tipo_od, latitud_od, longitud_od, direccion_od, nit_od})
    await orgDon.save()
    const enc_org_don = new Encargado_donante({id_user, puesto_trabajo_d, id_org_don: orgDon.id_org_don})
    await enc_org_don.save()
} 

export const verificar_tipo = async (id_user) => {
    let tipo = null;

    if(await Donante_natural.findByPk(id_user))
        tipo = 'donante_natural'
    else if(await  Encargado_donante.findByPk(id_user))
        tipo = 'encargado_donante'
    else if(await  Encargado_org_ben.findByPk(id_user))
        tipo = 'encargado_org_ben'
    else if(await  Encargado_receptor.findByPk(id_user))
        tipo = 'encargado_receptor'
    else if(await  Receptor_natural.findByPk(id_user))
        tipo = 'receptor_natural'
    else if(await  Voluntario.findByPk(id_user))
        tipo = 'voluntario'
    console.log(tipo)
    return tipo;
}