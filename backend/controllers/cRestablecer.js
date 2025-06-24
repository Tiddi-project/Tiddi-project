import error from "../middlewares/error.js";
import { sendEmail } from "../middlewares/nodemailer.js";
import mRestablecer from "../modules/mRestablecer.js";


const cRecuperation = {
    olvidoUser: async (req, res)=>{
        try {
            let {correoUsuario} = req.body
            const {user, token} = await mRestablecer.olvidoUser(correoUsuario)

            if (!user) {
                let err = {status: 401,  message: `El usuario no fue encontrado en la BD`,
                };
                return error.e401(err, req, res);
            }
            const link = `http://localhost:3000/restablecer-contrasenia.html?token=${token}`

            // Envías el correo con el enlace
            await sendEmail({
                to: correoUsuario,
                subject: "Recuperación de contraseña - TiDDi",
                html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                    <a href="${link}">${link}</a>`
            })

            res.json({ success: true, message: "Correo de recuperación enviado" })
            
        } catch (err) {
            error.e500(err, req, res);
        }
    },
    recuperacionUser: async (req, res)=>{
        try {
            const { token, newPassword } = req.body;

            await mRestablecer.restablecerUser(token, newPassword)

            res.status(200).json({ success: true, message: "Contraseña actualizada con éxito"  })
            
        } catch (err) {
            console.error("Error en recuperación:", err);
            error.e500(err, req, res);
        }
    },
}

export default cRecuperation;