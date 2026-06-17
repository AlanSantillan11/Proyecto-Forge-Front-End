import {Router} from "express"
import emergenciaController from "../controllers/emergencia.controller.js"
import validateToken from "../middleware/validateToken.js";
import soloFundacionDueña from "../middleware/soloFundacionDueña.js";


const emergenciaRoutes = Router();

emergenciaRoutes.get('/', emergenciaController.getAll);
emergenciaRoutes.post('/new',validateToken, emergenciaController.createOne);
emergenciaRoutes.get("/mis-postulados",validateToken,emergenciaController.getPostuladosFundacion);
emergenciaRoutes.get('/:id', emergenciaController.getOne);
emergenciaRoutes.put('/:id',validateToken,soloFundacionDueña, emergenciaController.updateOne);
emergenciaRoutes.delete("/:id",validateToken,soloFundacionDueña,emergenciaController.deleteOne);
emergenciaRoutes.post("/:id/postular",validateToken,emergenciaController.postularVoluntario);


export default emergenciaRoutes;