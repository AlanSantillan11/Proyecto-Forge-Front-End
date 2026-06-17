import {Router} from "express"
import fundacionController from "../controllers/fundacion.controller.js"


const fundacionRoutes = Router();

fundacionRoutes.get('/', fundacionController.getAll)
fundacionRoutes.post('/new', fundacionController.createOne)
fundacionRoutes.post('/login',fundacionController.login)


export default fundacionRoutes