import { response } from 'express';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/jwt.js';
import { Usuario, Persona, Receptor, Voluntario } from '../models/index_db.js'
import { insert_donante, insert_OrgBenenefica, insert_orgDonante, insert_orgReceptora, insert_receptorNatural, verificar_tipo } from '../helpers/insertions.js';
import Usuario_n from '../models/usuario_n.js';


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
        const estado = 0;
        // insercion de datos
        const persona = new Persona({ ci, nombre, ap_paterno, ap_materno, fecha_nac, nro_cel, correo })
        const usuario = new Usuario({ user, password: passEnc, ci, estado })
        await persona.save()
        await usuario.save()

        if (tipo === 'donante') {
            const { direccion_dn, lat, lng } = req.body;
            insert_donante(direccion_dn, lat, lng, usuario.id_user)
        }
        else if(tipo === 'orgDonante'){
            const {nombre_od, tipo_od, lat, lng , direccion_od, nit_od, puesto_trabajo_d} = req.body
            insert_orgDonante(nombre_od, tipo_od, lat, lng, direccion_od, nit_od, puesto_trabajo_d, usuario.id_user)
        }   
        else if(tipo === 'receptorNatural'){
            const { descripcion_rn, direccion_rn, lat, lng } = req.body
            insert_receptorNatural(usuario.id_user, descripcion_rn, direccion_rn, lat, lng)
            
        }
        else if(tipo === 'orgBenefica'){
            const {puesto_trabajo_d, nombre_od, tipo_od, direccion_od, lat, lng, nit_od} = req.body
            insert_OrgBenenefica(usuario.id_user, puesto_trabajo_d, nombre_od, tipo_od, direccion_od, lat, lng, nit_od)
        }

        else if(tipo === 'orgReceptora'){
            const {puesto_trabajo_d, nombre_od, tipo_od, direccion_od, lat, lng, nit_od} = req.body
            insert_orgReceptora(usuario.id_user, puesto_trabajo_d, nombre_od, tipo_od, direccion_od, lat, lng, nit_od)
        }

        else if(tipo === 'voluntario'){
            const {horario, turno} = req.body
            await new Voluntario({id_user: usuario.id_user, horario, turno}).save()
        }
        else if(tipo === 'usuarioN'){
            await new Usuario_n({id_user: usuario.id_user}).save();
        }
        
             
        // Generar nuestro JWT
        const token = await generarJWT(usuario.id_user, usuario.user, tipo)

        res.status(201).json({
            ok: true,
            uid: usuario.id_user,
            name: usuario.user,
            nombre: usuario.nombre,
            ap_paterno: usuario.ap_paterno,
            tipo: tipo,
            token,
            estado: estado
    
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

        if(usuario.dataValues.estado === 0){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario en revision'
            });
        }

        if(usuario.dataValues.estado === 2){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario rechazado'
            })
        }

        const tipo = await verificar_tipo(usuario.id_user);
        
        // Generar nuestro JWT
        const token = await generarJWT(usuario.id_user, usuario.user, tipo)


        res.json({
            ok: true,
            id_user: usuario.id_user,
            name: usuario.user,
            tipo: tipo,
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
    
    const { id_user, name, tipo } = req;

    //console.log(id_user, name, tipo)
    
    //generar nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(id_user, name, tipo)

    res.json({
            ok: true,
            
            token
    })
     
}

