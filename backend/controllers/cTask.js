import error from "../middlewares/error.js";
import mTask from "../modules/mTask.js";
import db from "../config/db.js";
import mSubtask from "../modules/mSubtask.js";


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
            let {title, description, priority, subtasks } = req.body

            // validar prioridad
            const validPriorities = ["baja", "media", "alta"];
            priority = validPriorities.includes(priority?.toLowerCase()) ? priority.toLowerCase() : "baja";

            // obtener conexion.
            const connection = await db.getConnection(); // Obtener conexión del pool
            try {
                await connection.beginTransaction(); // Iniciar transacción

                // add task
                let taskId = await mTask.addTask({title, description, userId, priority}, connection)
                if (subtasks && subtasks.length > 0) {
                    await mSubtask.addSubtask(taskId, subtasks, connection)
                }
                await connection.commit(); // Confirmar cambios en la BD
                res.status(201).json({ message: "Tarea creada con éxito", taskId });

            } catch (err) {
                await connection.rollback(); // Si hay error, revertimos cambios
                throw err
            }finally {
                connection.release(); // Liberar conexión de vuelta al pool

            }
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
            let {title, description, priority, subtasks} = req.body 
            subtasks = Array.isArray(subtasks) ? subtasks : [];
            let {id} = req.params
            console.log(req.body);

            const connection = await db.getConnection()
            try {
                await connection.beginTransaction()

                // Inserta la tarea
                let result = await mTask.updateTask({id, title, description, priority, userId}, connection)
                if (result.affectedRows === 0) {
                    await connection.rollback();
                    return res.status(404).json({ message: "Tarea no encontrada" });
                }
                // Actualizar subtareas
                await mSubtask.updateSubtask(id, subtasks, connection)
                await connection.commit();

                console.log("✔️ Enviando respuesta: Tarea actualizada con éxito");
                res.json({ message: "Tarea actualizada con éxito" });
            } catch (err) {
                console.error("❌ Error en updateTask:", err); // Agregar este log
                await connection.rollback();
                throw err;
            }finally {
                connection.release();
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