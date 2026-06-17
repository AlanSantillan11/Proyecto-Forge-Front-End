import controladorUsuario from "../controladores/controladorUsuario.js";
import {Router} from "express"



const rutaUsuario= Router();


rutaUsuario.get("/", controladorUsuario.getAll)
rutaUsuario.post("/nuevo", controladorUsuario.createOne)
rutaUsuario.post("/login", controladorUsuario.login)



export default rutaUsuario