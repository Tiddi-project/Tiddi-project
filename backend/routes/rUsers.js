import {Router} from "express"
import cUser from "../controllers/cUser.js"


const routes = Router()

routes.post("/signin", cUser.signUser)
routes.get("/users", cUser.getUser)

routes.post("/login", cUser.loginUser)

export default routes