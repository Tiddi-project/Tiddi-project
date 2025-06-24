import error from "../middlewares/error.js";
import {transporter} from "../middlewares/nodemailer.js";


const cComentarios = {
    sendComentario: async (req, res)=>{
        try {
            console.log("🎯 Entró al controlador de comentarios");
            let {nombre, correo, comentario} = req.body

            if (!nombre || !correo || !comentario) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }

            await transporter.sendMail({
                from: `"Formulario TiDDi" <no-reply@tiddi.com>`,
                to: "tiddiproject@gmail.com", // tu correo donde quieres recibir mensajes
                subject: `Nuevo mensaje de contacto de ${nombre}`,
                text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${comentario}`,
                replyTo: correo
            })

            res.status(200).json({ success: true, message: "Mensaje enviado correctamente" });

           
        } catch (err) {
            console.error("Error enviando correo:", err);
            
            error.e500(err, req, res)
        }
    }
}

export default cComentarios;