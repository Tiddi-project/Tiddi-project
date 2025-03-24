import {Router} from "express"
import cTask from "../controllers/cTask.js"


const routes = Router()

// Mostrara la pagina principal
routes.get("/tasks", cTask.getAll)  // complete
// Busqueda y creacion de tareas
routes.post("/task", cTask.addTask) // complete
routes.get("/task/:id", cTask.getOne)   // complete
    
// Busqueda y edicion de tareas
// routes.get("/edit/:id", (req, res)=>{})
routes.put("/edit/:id", cTask.updateTask)   // complete

// Tareas completadas 
routes.patch("/complete/:id", cTask.completeTask)
routes.get("/uncomplete/:id", (req, res)=>{})

// Eliminacion de tareas
routes.delete("/delete/:id", cTask.deleteTask)  // complete

export default routes
