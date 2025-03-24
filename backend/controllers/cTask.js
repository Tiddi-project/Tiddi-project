import error from "../middlewares/error.js";
import mTask from "../modules/mTask.js";


const cTask = {
    getAll: async (req, res)=>{
        try {
            let tasks = await mTask.getAll()
            res.json(tasks)
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    addTask: async (req, res)=>{
        try {
            let {title, description} = req.body
            await mTask.addTask({title, description})
        } catch (err) {
            error.e400({err, req, res})
        }
    },
    getOne: async (req, res)=>{
        try {
            let {id} = req.params
            let tasks = await mTask.getTask(id)
            res.json(tasks)
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    updateTask: async (req, res)=>{
        try {
            let {title, description} = req.body 
            let {id} = req.params
            let result = await mTask.updateTask({id, title, description})

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Tarea no encontrada" });
            }
        } catch (err) {
            error.e400(err, req, res)
        }
    },
    deleteTask: async (req, res)=>{
        try {
            let {id} = req.params
            await mTask.deleteTask(id)
        } catch (err) {
            error.e400(err, req, res)
        }
    },
    completeTask: async (req, res) =>{
        try {
            let {completed} = req.body
            let {id} = req.params
            await mTask.completeTask({completed, id})
        } catch (error) {
            
        }
    }
}


export default cTask;