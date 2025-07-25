import mUser from "../modules/mUser.js";
import error from "../middlewares/error.js";
import bcrypt from "bcrypt"
import db from "../config/db.js"
import crypto from "crypto";
import { sendEmail } from "../middlewares/nodemailer.js";


const cUser = {
    signUser: async (req, res)=>{
        try {
            let {name, email, password} = req.body
            
            // Manejo del token
            const activationToken = crypto.randomBytes(32).toString("hex");
            const activationExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora desde ahora

            // Se envia a la base de datos
            await mUser.createUser({name, email, password, activationToken, activationExpires})

            // Si todo va bien se envia el enlace al correo - enlace de activación
            const link = `http://localhost:3000/activateAccount?token=${activationToken}`; 

            // Se prepara el envio del correo
            await sendEmail({
                to: email,
                subject: "Activa tu cuenta",
                html: `
                    <h2>¡Bienvenido a TiDDi!</h2>
                    <p>Gracias por registrarte. Por favor haz clic en el siguiente enlace para activar tu cuenta:</p>
                    <a href="${link}">${link}</a>
                    <p><b>Este enlace expirará en 1 hora.</b></p>
                `
            });
            res.status(201).json({ success: true, message: "Usuario registrado, Revisa tu correo para activar tu cuenta"});
            // res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
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
            res.status(201).json(results)
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
            // Verificación de cuenta pendiente
            if (!user.is_verified) {
                return res.status(403).json({
                    success: false,
                    message: "Debes verificar tu cuenta antes de iniciar sesión. Revisa tu correo.",
                });
            }

            // Verificar si el usuario está inactivo
            if (user.status === "inactivo") {
                return res.status(403).json({ message: "Cuenta desactivada, contacta al administrador" });
            }
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
            // 🔥 ACTUALIZA LA SESIÓN CON LOS NUEVOS DATOS
            if (cambios.name) req.session.user.name = cambios.name;
            if (cambios.profile_picture) req.session.user.profile_picture = cambios.profile_picture;

            req.session.save((err) => {
                if (err) {
                    console.error("Error al guardar la sesión:", err);
                    return res.status(500).json({ message: "Error al actualizar sesión" });
                }
                return res.status(200).json({ status: true, message: "Perfil actualizado" });
            });

            // res.status(200).json({status : true, message: "Perfil actualizado"})
            
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    adminUpdate: async (req, res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            console.log(req.body);
            
            const userId = req.session.user.id
            const { id, estado, rol } = req.body;
            
            let resultado = await mUser.adminUpdate({ id, estado, rol })

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            return res.status(200).json({ message: "Usuario actualizado correctamente" });
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    disableAccount: async (req, res)=>{
        try {
            if(!req.session.user){
                return res.status(401).json({ message: "No has iniciado sesión" });
            }
            console.log(req.body);
            
            const userId = req.session.user.id
            const {estado} = req.body;
            
            await mUser.disableAccount(userId, estado)
            // 🧼 Destruir la sesión para cerrar el acceso inmediatamente
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: "Error al cerrar la sesión" });
                }

                res.clearCookie("connect.sid"); // 🍪 Borra la cookie de sesión (si estás usando session-file-store)
                return res.status(200).json({ message: "Cuenta desactivada y sesión cerrada" });
            });

            // return res.status(200).json({ message: "Usuario desabilitado correctamente" });
        } catch (err) {
            error.e500(err, req, res)
        }
    },
    activateAccount: async (req, res)=>{
        try {
            const { token } = req.query;

            if (!token) {
                return res.status(400).send("Token inválido");
            }

            await mUser.activateAccount(token)

            res.redirect("/cuenta-activada.html");

            // return res.status(200).json({ message: "Usuario desabilitado correctamente" });
        } catch (err) {
            error.e500(err, req, res)
        }
    },



    // recuperationUser: async (req, res)=>{
    //     try {
    //         let {correoUsuario} = req.body
    //         const {user, token} = await mUser.recuperationUser(correoUsuario)

    //         if (!user) {
    //             let err = {status: 401,  message: `El usuario no fue encontrado en la BD`,
    //             };
    //             return error.e401(err, req, res);
    //         }
    //         const link = `http://localhost:3000/reestablecer.html?token=${token}`

    //         // Envías el correo con el enlace
    //         await sendEmail({
    //             to: correoUsuario,
    //             subject: "Recuperación de contraseña - TiDDi",
    //             html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    //                 <a href="${link}">${link}</a>`
    //         })

    //         res.json({ success: true, message: "Correo de recuperación enviado" })
            
    //     } catch (err) {
    //         error.e500(err, req, res);
    //     }
    // }
}



export default cUser;