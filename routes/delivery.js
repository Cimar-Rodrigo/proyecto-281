import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post("/postularResponsableDelivery",[validarJWT], postularResponsableDelivery);

router.post("/confirmarResponsableDelivery", [validarJWT, validarAdmin], confirmarResponsableDelivery);

router.post("/getPendingDeliveriesAdmin", [validarJWT, validarAdmin], getPendingDeliveriesAdmin);

router.post("/getPendingDeliveriesVoluntario", [validarJWT], getPendingDeliveriesVoluntario);

router.get("/getDeliveryColaborador", [validarJWT], getDeliveryColaborador);

router.post("/postularColaboradorDelivery", [validarJWT], postularColaboradorDelivery);

router.get("/getEstadoPostulacionResponsable", [validarJWT], getEstadoPostulacionResponsable);

router.get("/getPostulacionColaborador", [validarJWT], getPostulacionColaborador);