import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { addDonation, confirmarResponsableDonacion, getPendingDonationsResponsableAdmin, getPendingDonationsResponsableVoluntario, postularResponsableDonacion } from "../controllers/donation.js";
import { validarAdmin } from "../middlewares/validar-admin.js";

const router = Router();

router.post("/addDonation",[validarJWT], addDonation);

router.post("/postularResponsableDonacion",[validarJWT], postularResponsableDonacion);

router.post("/confirmarResponsableDonacion", [validarJWT, validarAdmin], confirmarResponsableDonacion)

router.get("/getPendingDonationsAdmin", [validarJWT, validarAdmin], getPendingDonationsResponsableAdmin);

router.get("/getPendingDonationsVoluntario", [validarJWT], getPendingDonationsResponsableVoluntario );


export default router;