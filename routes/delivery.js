import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarAdmin } from "../middlewares/validar-admin.js";

import { getPostulacionColaborador, getEstadoPostulacionResponsable, postularColaboradorSolicitud, 
    getSolicitudColaborador, getDetalleSolicitud, addSolicitud, getItemsDisponibles, 
    confirmarSolicitud, getSolicitudesPendientes, postularResponsableDelivery, confirmarResponsableDelivery, 
    getPendingSolicitudesResponsableVoluntario, getPendingSolicitudesResponsableAdmin, verColaboradoresSolicitud, 
    verSolicitudesCompletas } from "../controllers/delivery.js";

const router = Router();

router.get("/getItemsDisponibles", [validarJWT], getItemsDisponibles)

router.post("/addSolicitud" , [validarJWT], addSolicitud);

router.post("/confirmarSolicitud", [validarJWT], confirmarSolicitud);

router.get("/getSolicitudesPendientes", [validarJWT, validarAdmin], getSolicitudesPendientes);


router.post("/postularResponsableDelivery",[validarJWT], postularResponsableDelivery);
//
router.post("/confirmarResponsableDelivery", [validarJWT, validarAdmin], confirmarResponsableDelivery);
//

router.get("/getPendingSolicitudesResponsableVoluntario", [validarJWT], getPendingSolicitudesResponsableVoluntario)

router.get("/getPendingSolicitudesResponsableAdmin", [validarAdmin, validarJWT], getPendingSolicitudesResponsableAdmin)

router.get("/getDetalleSolicitud", [validarJWT], getDetalleSolicitud)

router.get("/getSolicitudColaborador", [validarJWT], getSolicitudColaborador)

router.post("/postularColaboradorSolicitud", [validarJWT], postularColaboradorSolicitud)


router.get("/getEstadoPostulacionResponsable", [validarJWT], getEstadoPostulacionResponsable)

router.get("/getPostulacionColaborador", [validarJWT], getPostulacionColaborador)

router.get("/verSolicitudesCompletas", [validarJWT], verSolicitudesCompletas)


router.get("/verColaboradoresSolicitud", [validarJWT], verColaboradoresSolicitud)

export default router;