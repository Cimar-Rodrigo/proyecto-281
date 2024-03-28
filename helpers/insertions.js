import { Donante, Donante_natural, Organizacion_donante, Encargado_donante, Encargado_org_ben, Encargado_receptor, Receptor, Receptor_natural, Voluntario, Administrador, Organizacion_benefica, Organizacion_receptora } from '../models/index_db.js'
import Usuario_n from '../models/usuario_n.js';


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


export const insert_receptorNatural = async (id_user, descripcion_rn, direccion_rn, latitud_rn, longitud_rn) => {
    await new Receptor({id_user}).save()
    await new Receptor_natural({ id_user, descripcion_rn, direccion_rn, latitud_rn, longitud_rn }).save()

}

export const insert_OrgBenenefica = async (id_user, puesto_trabajo_ob, nombre_ob, tipo_ob, direccion_b, latitud_ob, longitud_ob, nit_ob) => {
    await new Receptor({id_user}).save()
    const orgBen = new Organizacion_benefica({nombre_ob, tipo_ob, direccion_b, latitud_ob, longitud_ob, nit_ob})
    await orgBen.save()
    await new Encargado_org_ben({id_user, puesto_trabajo_ob, id_org_ben:orgBen.id_org_ben}).save()
}


export const insert_orgReceptora = async (id_user, puesto_trabajo_er, nombre_or, tipo_or, direccion_or, latitud_or, longitud_or, nit_or) => {
    await new Receptor({id_user}).save()
    const orgRec = new Organizacion_receptora({nombre_or, tipo_or, direccion_or, latitud_or, longitud_or, nit_or})
    await orgRec.save()
    await new Encargado_receptor({id_user, puesto_trabajo_er, id_org_rec: orgRec.id_org_rec}).save()
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
    else if(await Usuario_n.findByPk(id_user))
        tipo = 'usuario_n'
    else if(await Administrador.findByPk(id_user))
        tipo = 'administrador'
    
    console.log(tipo)
    return tipo;
}