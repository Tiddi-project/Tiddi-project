import {Router} from "express"
import cComentarios from "../controllers/cComentarios.js"


const routes = Router()

routes.post("/comentarios", cComentarios.sendComentario)


export default routes