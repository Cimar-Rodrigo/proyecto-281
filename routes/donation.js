import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { addDonation, confirmarResponsableDonacion, getDetalleDonacion, getDonacionColaborador, getEstadoPostulacionResponsable, getPendingDonationsResponsableAdmin, getPendingDonationsResponsableVoluntario, postularColaboradorDonacion, postularResponsableDonacion } from "../controllers/donation.js";
import { validarAdmin } from "../middlewares/validar-admin.js";

const router = Router();

router.post("/addDonation",[validarJWT], addDonation);

router.post("/postularResponsableDonacion",[validarJWT], postularResponsableDonacion);

router.post("/confirmarResponsableDonacion", [validarJWT, validarAdmin], confirmarResponsableDonacion)

router.get("/getPendingDonationsAdmin", [validarJWT, validarAdmin], getPendingDonationsResponsableAdmin);

router.get("/getPendingDonationsVoluntario", [validarJWT], getPendingDonationsResponsableVoluntario );

router.get("/getDetalleDonacion", [validarJWT], getDetalleDonacion)

router.get("/getDonacionColaborador", [validarJWT], getDonacionColaborador)

router.post("/postularColaboradorDonacion", [validarJWT], postularColaboradorDonacion)

router.get("/getEstadoPostulacionResponsable", [validarJWT], getEstadoPostulacionResponsable)

export default router;
