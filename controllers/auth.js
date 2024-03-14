import { response } from 'express';
import { pool } from '../database/config.js';

export const crearUsuario = (req, res = response) => {
    
    const { ci, nombre, ap_paterno, ap_materno, fecha_nac, nro_cel, correo } = req.body

    // console.log(ci, nombre, ap_paterno, ap_materno, fecha_nac, nro_cel, correo)

    pool.query(`insert into persona(ci, nombre, ap_paterno, ap_materno, fecha_nac, nro_cel, correo) values (${ci}, '${nombre}', '${ap_paterno}', '${ap_materno}', '${fecha_nac}', ${nro_cel}, '${correo}')`)
    
    res.status(201).json({
        ok: true,
        msg: 'register',
        ci,
        nombre,
        ap_paterno,
        ap_materno,
        fecha_nac,
        nro_cel,
        correo
        

    })

}

export const loginUsuario = (req, res = response) => {

    const { email, password } = req.body
    


    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
    
}

export const revalidarToken = (req, res = response) => {
        
     res.json({
             ok: true,
             msg: 'renew'
     })
     
}