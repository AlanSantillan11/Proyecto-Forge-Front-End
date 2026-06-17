import controladorDestinos from "../controladores/controladorDestinos.js";
import { Router } from "express";
import validarToken from "../middleware/validarToken.js";


const rutaDestinos =Router();

rutaDestinos.get("/", validarToken,  controladorDestinos.getAll)

rutaDestinos.post("/nuevo", validarToken, controladorDestinos.createOne)

rutaDestinos.get("/:id", validarToken, controladorDestinos.getOne)

rutaDestinos.delete("/:id", validarToken, controladorDestinos.deleteOne)

rutaDestinos.put("/actualizar/:id", validarToken, controladorDestinos.updateOne)

rutaDestinos.post("/opiniones/:id", validarToken, controladorDestinos.agregarOpinion)


export default rutaDestinos; 