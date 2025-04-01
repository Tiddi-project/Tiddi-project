import error from "../middlewares/error.js";
import mSubtask from "../modules/mSubtask.js";

const cSubtask= {
    getAllSubtask: async (req,res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            let {id} = req.params
            let results = await mSubtask.getAllSubtask(id)
            res.json(results);

        } catch (err) {
            error.e400(err, req, res)
        }
    }
}

export default cSubtask;