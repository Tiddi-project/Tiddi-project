import db from "../config/db.js"

const mTask = {
    getAll: async (userId)=>{
        try {
            // const [results] = await db.query("SELECT * FROM tasks ;")
            const [results] = await db.query("SELECT * FROM tasks WHERE user_id = ?;", [userId])
            // console.log(results);
            return results
        } catch (error) {
            throw {status:500, message: "Error al cargar las tareas"}
        }
    },
    addTask : async (task)=>{
        await db.query("insert into tasks (title, description, user_id, priority) values (?,?,?,?)", [task.title, task.description, task.userId, task.priority])
    },
    getTask: async (task)=>{
        let [results] = await db.query("SELECT * FROM tasks WHERE id = ? AND user_id = ?;", [task.id, task.userId])
        return results
    },
    updateTask: async (task)=>{
        await db.query("UPDATE tasks SET title= ? , description= ?, priority = ? WHERE id = ? AND user_id = ?;", [task.title, task.description, task.priority, task.id,  task.userId])
    },
    deleteTask: async (task)=>{
        await db.query("DELETE FROM tasks WHERE id = ? AND user_id = ?;", [task.id, task.userId])
    },
    completeTask: async (task)=>{
        await db.query("UPDATE tasks SET complete= ? WHERE id = ? AND user_id = ?;", [task.completed, task.id, task.userId])

    },
    progressTasks: async (userId)=>{
       
            let [results] = await db.query(`
                select 
                    count(*) as totalTask, 
                    count(case when complete = 1 then 1 end) as complete
                    from tasks
                 WHERE user_id = ?;`
            , [userId])
            
            return results
        
    }
}

export default mTask;