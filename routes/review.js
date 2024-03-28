import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { mostrar_usuarios, validar_usuario } from '../controllers/review.js';

const router = Router();

router.get('/userPendings', validarJWT, mostrar_usuarios)


router.post('/userValidated', validarJWT, validar_usuario)
export default router;