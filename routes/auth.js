/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

import { Router } from 'express';
import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();



router.post(
    '/new',
    [ //middlewares
        check('ci', 'La cedula es obligatoria').not().isEmpty().isNumeric(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('ap_paterno', 'El apellido paterno no puede contener numeros ni caracteres especiales').isAlpha(),
        check('ap_materno', 'El apellido materno no puede contener numeros ni caracteres especiales').isAlpha(),
        check('fecha_nac', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('nro_cel', 'El numero de celular es obligatorio').not().isEmpty().isNumeric(),
        check('correo', 'El email es obligatorio').isEmail(),
        check('user', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de un minimo de 8 caracteres').isLength({min: 8}),
        // check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario)


router.post(
    '/',
    [
        check('user', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 8}),
        validarCampos
    ],
    loginUsuario)


router.get('/renew', [
    validarJWT
], revalidarToken)

// router.get('/base', async (req, res) => {
//     // const result = await pool.query('select * from persona')
//     const result = await pool.query(`insert into persona(ci, nombre, ap_paterno, ap_materno, fecha_nac, nro_cel, correo) values (12496542, 'Juan', 'Perez', 'Gomez', '1999-12-12', 12345678, 'juanito@gmail.com')`)
//     
//     res.json(result)
// }
// )


export default router;