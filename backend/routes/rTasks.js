import {Router} from "express"
import cTask from "../controllers/cTask.js"

const routes = Router()

// Mostrara la pagina principal
routes.get("/tasks", cTask.getAll)  // complete para todas las tareas

// Busqueda y creacion de tareas
routes.post("/task", cTask.addTask) // complete
routes.get("/task/:id", cTask.getOne)   // complete
    
// Busqueda y edicion de tareas
routes.put("/edit/:id", cTask.updateTask)   // complete

// Tareas completadas 
routes.patch("/complete/:id", cTask.completeTask)

// Eliminacion de tareas
routes.delete("/delete/:id", cTask.deleteTask)  // complete

// Muestra el progreso de total de tareas vs completadas
routes.get("/progress", cTask.progressTasks)  // progess

export default routes;
