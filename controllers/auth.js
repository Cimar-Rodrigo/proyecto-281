import { response } from 'express';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/jwt.js';
import { Usuario, Persona, Receptor, Voluntario } from '../models/index_db.js'
import { insert_donante, insert_orgDonante } from '../helpers/insertions.js';


export const crearUsuario = async (req, res = response) => {
    
    const { ci, nombre, ap_paterno, ap_materno, fecha_nac, nro_cel, correo, user, password, tipo } = req.body

    try {      
        
        if (await Persona.findOne({where:{correo: correo}})){
            console.log("El correo ya existe")
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            })
        } 
        if (await Usuario.findOne({where:{user:user}})){
            console.log("El usuario ya existe")
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese usuario'
            })
        }


        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const passEnc = bcrypt.hashSync(password, salt);

        // insercion de datos
        const persona = new Persona({ ci, nombre, ap_paterno, ap_materno, fecha_nac, nro_cel, correo })
        const usuario = new Usuario({ user, password: passEnc, ci })
        await persona.save()
        await usuario.save()

        if (tipo === 'Donante') {
            const { direccion_dn, lat, lng } = req.body;
            insert_donante(direccion_dn, lat, lng, usuario.id_user)

        }
        else if(tipo === 'orgDonante'){
            const {nombre_od, tipo_od, lat, lng , direccion_od, nit_od, puesto_trabajo_d} = req.body
            insert_orgDonante(nombre_od, tipo_od, lat, lng, direccion_od, nit_od, puesto_trabajo_d, usuario.id_user)
        }   
        else if(tipo === 'Receptor'){
            await new Receptor({id_user: usuario.id_user}).save()
        }
        else if(tipo === 'Voluntario'){
            const {horario, turno} = req.body
            await new Voluntario({id_user: usuario.id_user, horario, turno}).save()
        }
             
        // Generar nuestro JWT
        const token = await generarJWT(usuario.id_user, usuario.user)

        res.status(201).json({
            ok: true,
            uid: usuario.id_user,
            name: usuario.user,
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
    
    /*const prueba = await Persona.findAll({
        include: {
            model: Usuario
        }
        
    })
    
    res.json(prueba)
    */
    try{
        
        const usuario = await Usuario.findOne({ where: {user: user} })

        // console.log(usuario)

        if (!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese usuario'
            });
        }

        // confirmar los passwords

        const validPassword = bcrypt.compareSync(password, usuario.dataValues.password);

        // console.log(validPassword)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        // Generar nuestro JWT
        const token = await generarJWT(usuario.id_user, usuario.user)


        res.json({
            ok: true,
            uid: usuario.id_user,
            name: usuario.user,
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

