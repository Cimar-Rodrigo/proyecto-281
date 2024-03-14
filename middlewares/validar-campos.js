import { response } from 'express';
import { validationResult } from 'express-validator';


export const validarCampos = (req, res = response, next) => {

    const errors =  validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next()
}