import {response} from 'express';
import jwt from 'jsonwebtoken';


export const validarAdmin = (req, res = response, next) => {
    
    
    // x-token headers
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try{

        const {tipo} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        console.log(tipo)
        if(tipo !== 'administrador'){
            return res.status(401).json({
                ok: true,
                msg: 'Acceso denegado'
            })
        }
        

    } catch {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next()

}

