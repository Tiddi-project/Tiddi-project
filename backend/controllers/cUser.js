import mUser from "../modules/mUser.js";
import error from "../middlewares/error.js";
import bcrypt from "bcrypt"
import db from "../config/db.js"


const cUser = {
    signUser: async (req, res)=>{
        try {
            let {name, email, password} = req.body
            await mUser.createUser({name, email, password})
            res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
        } catch (err) {
            if (err.code === 409) {
                return res.status(409).json({ success: false, message: err.message });
            }
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
            // console.log("👉 Email y password recibidos:", email, password)
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
    },
    perfilUser: async (req, res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            const userId = req.session.user.id
            await cUser.perfilUser(userId)
            res.json({user : userId})
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    updatePerfilUser: async (req, res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            console.log(req.body);
            
            const userId = req.session.user.id
            const { name, contraseniaAnterior, contraseniaNueva } = req.body;
            let imagen = null;
            
            console.log(contraseniaAnterior);
            console.log(contraseniaNueva);
            if (req.file) imagen = `/uploads/${req.file.filename}`;
            
            // Validaciones y construcción de cambios
            const cambios = {};
            if (name && name.trim()) cambios.name = name.trim();
            if (imagen) cambios.profile_picture = imagen;
            
            if (contraseniaAnterior && contraseniaNueva) {
                // Primero verifica que la contraseña actual sea correcta
                console.log("Si entro en el if");
                const [rows] = await db.execute("SELECT password FROM users WHERE id = ?", [userId]);
                const user = rows[0];
                const passwordValida = await bcrypt.compare(contraseniaAnterior, user.password);
                if (!passwordValida) {
                    return res.status(400).json({ message: "La contraseña actual es incorrecta" });
                }
                // Hashea la nueva contraseña
                const hashedPassword = await bcrypt.hash(contraseniaNueva, 10);
                cambios.password = hashedPassword;
            }

            if (Object.keys(cambios).length === 0) {
                return res.status(400).json({ message: "No hay cambios para actualizar" });
            }
            console.log(cambios);
            await mUser.updateUser(userId, cambios)
            res.status(200).json({status : true, message: "Perfil actualizado"})
            
        } catch (err) {
            error.e500(err, req, res)
        }
    },
}

export default cUser;