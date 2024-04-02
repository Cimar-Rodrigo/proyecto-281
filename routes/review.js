import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarAdmin } from '../middlewares/validar-admin.js';
import { mostrar_todos_usuarios, mostrar_usuarios_pendientes, validar_usuario } from '../controllers/review.js';

const router = Router();

router.get('/userPendings', [validarJWT, validarAdmin], mostrar_usuarios_pendientes)


router.post('/userValidated', [validarJWT, validarAdmin], validar_usuario)

router.get('/userAll', [validarJWT, validarAdmin], mostrar_todos_usuarios)

//router.post('/allUsers', validarJWT, mostrar_todos_usuarios)

export default router;