import db from "../config/db.js";

const mSubtask = {
    getAllSubtask: async (task_id)=>{
        let [results] = await db.query("SELECT * FROM subtasks WHERE task_id = ?;", [task_id])
        return results;
    }
}

export default mSubtask;