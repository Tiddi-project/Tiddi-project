import mUser from "../modules/mUser.js";
import error from "../middlewares/error.js";
import bcrypt from "bcrypt"

const cUser = {
    signUser: async (req, res)=>{
        try {
            let {name, email, password} = req.body
            await mUser.createUser({name, email, password})
            res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    getUser: async (req, res)=>{
        try {
            let results = await mUser.oneUser()
            res.json(results)
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    loginUser: async (req, res)=>{
        try {
            let {email, password} = req.body
            
            const results = await mUser.loginUser(email)

            // res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });

            if(results.length === 0){
                let err = {status: 401,  message: `El usuario no fue encontrado en la BD`,
                };
               return error.e401(err, req, res);
            }

            let user = results[0]
            let isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                let err = {status: 403, message: "Contraseña incorrecta"};
                return error.e403(err, req, res);
            }
            
            req.session.user = user;
            console.log("✅ Sesión después de login:", req.session); 
            res.json({ success: true, message: "Usuario autenticado" });
            

        } catch (err) {
            error.e500(err, req, res);
        }
    },
    logout: (req, res)=>{
        req.session.destroy((err)=>{
            if(err){
                return res.status(500).json({ success: false, message: "Error al cerrar sesión" });
            }
            res.json({ success: true, message: "Sesión cerrada exitosamente" });
        })

    },
    oneUser: async (req, res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            const userId = req.session.user
            res.json({user : userId})
        } catch (error) {
            error.e500(err, req, res)
        }
    }
}

export default cUser;