import { response } from 'express';
import { pool } from '../database/config.js';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/jwt.js';


export const crearUsuario = async (req, res = response) => {
    
    const { ci, nombre, ap_paterno, ap_materno, fecha_nac, nro_cel, correo, user, password } = req.body

    // console.log(ci, nombre, ap_paterno, ap_materno, fecha_nac, nro_cel, correo)

    try {      
        const  validarCorreo = await pool.query(`select correo from persona where correo = '${correo}'`)
        const  validarUsuario = await pool.query(`select id_user, user from usuario where user = '${user}'`)
        
        
        if (validarCorreo[0][0] !== undefined){
            console.log("El correo ya existe")
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            })
        } 
        if (validarUsuario[0][0] !== undefined){
            console.log("El usuario ya existe")
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese usuario'
            })
        }


        // encriptar contraseña
        const salt = bcrypt.genSaltSync();

        const passEnc = bcrypt.hashSync(password, salt);


        await pool.query(`
        insert into persona(ci, nombre, ap_paterno, ap_materno, fecha_nac, nro_cel, correo) 
        values (${ci}, '${nombre}', '${ap_paterno}', '${ap_materno}', 
        '${fecha_nac}', ${nro_cel}, '${correo}')`)
  

        await pool.query(`insert into usuario(user, password, ci) 
        values ('${user}', '${passEnc}', ${ci})`)

        const datos = await pool.query(`select id_user, user from usuario where user = '${user}'`)
        // Generar nuestro JWT

        const token = await generarJWT(datos[0][0].id_user, datos[0][0].user)

        res.status(201).json({
            ok: true,
            uid: datos[0][0].id_user,
            name: datos[0][0].user,
            token
    
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
        console.log(error)        
    }

}

export const loginUsuario = async (req, res = response) => {

    const { user, password } = req.body
    
    try{
        
        const result = await pool.query(`select id_user, user, password from usuario where user = '${user}'`)
        
        if (result[0][0] === undefined){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese usuario'
            });
        }

        // confirmar los passwords

        const validPassword = bcrypt.compareSync(password, result[0][0].password);

        // console.log(validPassword)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar nuestro JWT
        const token = await generarJWT(result[0][0].id_user, result[0][0].user)


        res.json({
            ok: true,
            uid: result[0][0].id_user,
            name: result[0][0].user,
            token
        })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
        console.log(error)        
    }
    
}

export const revalidarToken = async (req, res = response) => {
    
    const { uid, name } = req;

    //generar nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name)

    res.json({
            ok: true,
            token
    })
     
}