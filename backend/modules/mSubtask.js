import db from "../config/db.js";

const mSubtask = {
    getAllSubtask: async (task_id)=>{
        let [results] = await db.query("SELECT * FROM subtasks WHERE task_id = ?;", [task_id])
        return results;
    },
    addSubtask: async(taskId, subtasks, connection)=>{
            if (subtasks.length === 0) return;
            const placeholders = subtasks.map(() => "(?, ?, ?)").join(", ");
            const values = subtasks.flatMap(subtask => [taskId, subtask.title, subtask.complete]);
            await connection.execute(
                `INSERT INTO subtasks (task_id, title, complete) VALUES ${placeholders}`, 
                values
            );
    },
    updateSubtask: async (taskId, subtasks, connection)=>{
        try {
            console.log("👉 Subtareas recibidas para actualizar:", subtasks);
            // Obtener las subtareas actuales de la tarea
            let [existingSubtasks] = await connection.execute(
                "SELECT id FROM subtasks WHERE task_id = ?",[taskId]
            )

            // Extraer los IDs actuales de la base de datos
            const existingIds = existingSubtasks.map(sub => sub.id) 
            const receivedIds = subtasks.map(sub => sub.id).filter(id => id) //muestra solo los id de las sub sin null
            // Eliminar subtareas que ya no existen en la actualización
            const subtasksToDelete = existingIds.filter(id => !receivedIds.includes(id));
            console.log("🗑️ Subtareas a eliminar:", subtasksToDelete);
            if (subtasksToDelete.length > 0) {
                await connection.execute(`DELETE FROM subtasks WHERE id IN (${subtasksToDelete.map(() => '?').join(', ')})`, subtasksToDelete);
            }

            // Actualizar subtareas existentes
            const subtasksToUpdate = subtasks.filter(sub => sub.id)
            console.log("✏️ Subtareas a actualizar:", subtasksToUpdate);
            for (let sub of subtasksToUpdate) {
                await connection.execute(
                    "UPDATE subtasks SET title = ?, complete = ? WHERE id = ? AND task_id = ?",
                    [sub.title, sub.complete, sub.id, taskId]
                );
            }

            // Insertar nuevas subtareas
            const subtasksToInsert = subtasks.filter(sub => !sub.id);
            console.log("➕ Subtareas a insertar:", subtasksToInsert);
            if (subtasksToInsert.length > 0) {
                const placeholders = subtasksToInsert.map(() => "(?, ?, ?)").join(", ");
                const values = subtasksToInsert.flatMap(sub => [taskId, sub.title, sub.complete]);
    
                await connection.execute(
                    `INSERT INTO subtasks (task_id, title, complete) VALUES ${placeholders}`,
                    values
                );
            }
        } catch (error) {
            throw { status: 500, message: "Error al actualizar las subtareas" };
        }
    }
}

export default mSubtask;