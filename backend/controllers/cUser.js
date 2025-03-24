import mUser from "../modules/mUser.js";
import error from "../middlewares/error.js";
import bcrypt from "bcrypt"

const cUser = {
    signUser: async (req, res)=>{
        try {
            let {name, email, password} = req.body
            await mUser.createUser({name, email, password})
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    getUser: async (req, res)=>{
        try {
            let results = await mUser.oneUser()
            res.json(results)
        } catch (error) {
            error.e500(err, req, res)
        }
    },
    loginUser: async (req, res)=>{
        try {
            let {email, password} = req.body
            console.log(email);
            console.log(password);
            const results = await mUser.loginUser(email)
            console.log(results);
            if(results.length === 0){
                let err = {
                    status: 401,
                    message: `El usuario no fue encontrado en la BD`,
                };
               return error.e401(err, req, res);
            }

            let user = results[0]
            let isMatch = await bcrypt.compare(password, user.password)
            console.log("la contrasena es", isMatch);
            if(!isMatch){
                console.log("se activa el error");
                let err = {
                    status: 403,
                    message: "Contraseña incorrecta",
                };
                return error.e403(err, req, res);
            }
            
            req.session.user = user;
            
            res.json({ success: true, message: "Usuario autenticado" });

        } catch (err) {
            return error.e500(err, req, res);
        }
    }
}

export default cUser;