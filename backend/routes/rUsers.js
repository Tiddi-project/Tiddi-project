import {Router} from "express"
import cUser from "../controllers/cUser.js"
import upload from "../middlewares/multer.js"


const routes = Router()

routes.post("/signin", cUser.signUser)
routes.get("/users", cUser.getUser)
routes.get("/user", cUser.oneUser)
routes.post("/login", cUser.loginUser)
routes.post("/logout", cUser.logout)
routes.get("/user/:id", cUser.perfilUser)
routes.patch("/user/:id", upload.single("imagen"), cUser.updatePerfilUser)

export default routes