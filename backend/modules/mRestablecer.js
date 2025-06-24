import db from "../config/db.js"
import crypto from "crypto"
import bcrypt from "bcrypt"; 

const TOKEN_EXPIRATION_MINUTES = 30

const mRestablecer = {
    olvidoUser: async (email)=>{
        let [results] = await db.execute("SELECT * FROM users WHERE email = ?;",[email])

        if (results.length === 0) return []

        const token = crypto.randomBytes(32).toString("hex")
        const expiration = new Date(Date.now() + TOKEN_EXPIRATION_MINUTES * 60 * 1000)

        // Guardamos el token y su fecha de expiración en el usuario
        await db.execute(`
            UPDATE users 
            SET reset_token = ?, reset_token_expires = ? 
            WHERE email = ?;
        `, [token, expiration, email])

        // Puedes devolver también el token para enviarlo por correo
        return { user: results[0], token }

    },
    restablecerUser: async (token, newPassword)=>{
        // 1. Buscar usuario con ese token
        const [results] = await db.execute(`
            SELECT * FROM users 
            WHERE reset_token = ? AND reset_token_expires > NOW()
        `, [token]);

        if (results.length === 0) {
            throw new Error("Token inválido o expirado");
        }

        const user = results[0];

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 3. Actualizar contraseña y limpiar el token
        await db.execute(`
            UPDATE users 
            SET password = ?, reset_token = NULL, reset_token_expires = NULL 
            WHERE id = ?
        `, [hashedPassword, user.id]);


    }
}


export default mRestablecer