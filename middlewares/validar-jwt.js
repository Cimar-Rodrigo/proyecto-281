import {response} from 'express';
import jwt from 'jsonwebtoken';


export const validarJWT = (req, res = response, next) => {
    
    
    // x-token headers
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try{

        const {id_user, name, tipo} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        req.id_user = id_user
        req.name = name
        req.tipo = tipo

    } catch {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next()

}

