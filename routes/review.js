import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { mostrar_usuarios } from '../controllers/review.js';

const router = Router();

router.get('/', validarJWT, mostrar_usuarios)


export default router;