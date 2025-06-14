import db from "../config/db.js"

const mTask = {
    getAll: async (userId)=>{
        try {
            // const [results] = await db.query("SELECT * FROM tasks ;")
            // const [results] = await db.query("SELECT * FROM tasks WHERE user_id = ?;", [userId])
            const [results] = await db.execute(`
                SELECT 
                    t.id AS task_id, t.title, t.description, t.complete, t.priority,t.deadline,t.color, t.imagen_url, t.reminder_min,
                    JSON_ARRAYAGG(
                        JSON_OBJECT('id', s.id, 'title', s.title, 'complete', s.complete)
                    ) AS subtasks
                FROM tasks t
                LEFT JOIN subtasks s ON t.id = s.task_id
                WHERE t.user_id = ?
                GROUP BY t.id;

                `, 
                [userId]
            )
            
            // console.log(results);
            return results
        } catch (error) {
            throw {status:500, message: "Error al cargar las tareas"}
        }
    },
    addTask : async (task, connection)=>{
            let [taskResult] = await connection.execute(
                "insert into tasks (title, description, user_id, priority, deadline, color, imagen_url, reminder_min) values (?,?,?,?,?,?,?,?)", [task.title, task.description, task.userId, task.priority, task.deadline, task.color, task.imagen_url, task.reminder ]
            );

            // Obtener el ID de la nueva tarea
            return taskResult.insertId;    // Retornar el ID de la tarea insertada
           
    },
    getTask: async (task)=>{
        let [results] = await db.execute("SELECT * FROM tasks WHERE id = ? AND user_id = ?;", [task.id, task.userId])
        return results
    },
    updateTask: async (task, connection)=>{
        console.log({
            title: task.title,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline,
            color: task.color,
            imagen_url: task.imagen_url,
            id: task.id,
            userId: task.userId,
            reminder: task.reminder,
            complete: task.completed
          });
          
        let [results] = await connection.execute(
            "UPDATE tasks SET title= ? , description= ?, priority = ?, deadline = ?, color = ?, imagen_url = ?, reminder_min= ?, complete= ? WHERE id = ? AND user_id = ?;", 
            [task.title, task.description, task.priority, task.deadline, task.color, task.imagen_url, task.reminder, task.completed, task.id,  task.userId]
        )
        return results
    },
    deleteTask: async (task)=>{
        await db.execute("DELETE FROM tasks WHERE id = ? AND user_id = ?;", [task.id, task.userId])
    },
    completeTask: async (task)=>{
        console.log(task);
        const [result] = await db.execute("UPDATE tasks SET complete= ? WHERE id = ? AND user_id = ?;", [task.completed, task.id, task.userId])

        if (result.affectedRows === 0) {
            // No se actualizó ninguna tarea, probablemente porque no encontró la tarea o no pertenece al usuario
            return { success: false, message: "Tarea no encontrada o sin permiso" };
        }
        return { success: true };
    },
    progressTasks: async (userId)=>{
       
            let [results] = await db.execute(`
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