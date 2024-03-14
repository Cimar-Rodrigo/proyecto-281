import { response } from 'express';

export const crearUsuario = (req, res = response) => {
    
    const { email, name, password } = req.body

    res.status(201).json({
        ok: true,
        msg: 'register',
        name,
        email,
        password

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