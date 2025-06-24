import {Router} from "express"
import cRecuperation from "../controllers/cRestablecer.js"


const routes = Router()

routes.post("/olvido", cRecuperation.olvidoUser)
routes.post("/restablecer", cRecuperation.recuperacionUser)


export default routes