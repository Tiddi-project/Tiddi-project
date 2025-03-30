import error from "../middlewares/error.js";
import mTask from "../modules/mTask.js";


const cTask = {
    getAll: async (req, res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            const userId = req.session.user.id
            let tasks = await mTask.getAll(userId)
            res.json(tasks)
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    addTask: async (req, res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            const userId = req.session.user.id
            let {title, description, priority} = req.body

            // Convertir a minúsculas y validar prioridad
            const validPriorities = ["baja", "media", "alta"];
            priority = priority ? priority.toLowerCase() : "baja";

            // Si la prioridad no es válida, asignar "media"
            // if (!validPriorities.includes(priority)) {
            //     priority = "media";
            // }

            priority = priority.toLowerCase()
            await mTask.addTask({title, description, userId, priority})
        } catch (err) {
            error.e400(err, req, res)
        }
    },
    getOne: async (req, res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            const userId = req.session.user.id
            let {id} = req.params
            let tasks = await mTask.getTask({id, userId})
            res.json(tasks)
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    updateTask: async (req, res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            const userId = req.session.user.id
            let {title, description, priority} = req.body 
            console.log(title);
            console.log(description);
            console.log(priority);
            // priority = prioritypriority.toLowerCase()

            let {id} = req.params
            let result = await mTask.updateTask({id, title, description, priority, userId})

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Tarea no encontrada" });
            }
        } catch (err) {
            error.e400(err, req, res)
        }
    },
    deleteTask: async (req, res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            const userId = req.session.user.id
            let {id} = req.params
            await mTask.deleteTask({id, userId})
        } catch (err) {
            error.e400(err, req, res)
        }
    },
    completeTask: async (req, res) =>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            const userId = req.session.user.id
            let {completed} = req.body
            let {id} = req.params
            await mTask.completeTask({completed, id, userId})
        } catch (error) {
            error.e400(err, req, res)
        }
    },
    progressTasks: async (req, res) =>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            const userId = req.session.user.id
            let results = await mTask.progressTasks(userId)
            res.json(results)
        } catch (error) {
            error.e500(err, req, res)
        }
    }
}


export default cTask;