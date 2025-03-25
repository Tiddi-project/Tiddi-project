import db from "../config/db.js"

const mTask = {
    getAll: async ()=>{
        try {
            const [results] = await db.query("SELECT * FROM tasks;")
            // console.log(results);
            return results
        } catch (error) {
            throw {status:500, message: "Error al cargar las tareas"}
        }
    },
    addTask : async (task)=>{
        await db.query("insert into tasks (title, description) values (?,?)", [task.title, task.description])
    },
    getTask: async (id)=>{
        let [results] = await db.query("SELECT * FROM tasks WHERE id = ?;", [id])
        return results
    },
    updateTask: async (task)=>{
        await db.query("UPDATE tasks SET title= ? , description=? WHERE id = ?;", [task.title, task.description, task.id])
    },
    deleteTask: async (id)=>{
        await db.query("DELETE FROM tasks WHERE id = ?;", [id])
    },
    completeTask: async (task)=>{
        await db.query("UPDATE tasks SET complete= ? WHERE id = ?;", [task.completed, task.id])

    },
    progressTasks: async ()=>{
       
            let [results] = await db.query("select count(*) as totalTask, count(case when complete = 1 then 1 end) as complete from tasks;")
            
            return results
        
    }
}

export default mTask;