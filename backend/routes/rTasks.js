import {Router} from "express"
import cTask from "../controllers/cTask.js"
import upload from "../middlewares/multer.js"


const routes = Router()
/*------------------------------------------------------------------------creacion de tareas */
// Mostrara la pagina principal
routes.get("/tasks", cTask.getAll)  // todas las tareas

// Busqueda y creacion de tareas
// routes.post("/task", cTask.addTask) // ruta sin el anexo de las imagenes
routes.post("/task", upload.single("imagen"), cTask.addTask) // ruta con el anexo de las imagenes
// ↑ “Voy a recibir un solo archivo, en un campo de formulario llamado imagen.
routes.get("/task/:id", cTask.getOne)   // complete
    
// Busqueda y edicion de tareas
routes.put("/edit/:id", upload.single("imagen"), cTask.updateTask)   // complete

// Tareas completadas 
routes.patch("/complete/:id", cTask.completeTask)
routes.patch("/subtask/:id",  cTask.completeSubtask)

// Eliminacion de tareas
routes.delete("/delete/:id", cTask.deleteTask)  // complete

// Muestra el progreso de total de tareas vs completadas
routes.get("/progress", cTask.progressTasks)  // progress


export default routes;
