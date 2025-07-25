import db from "../config/db.js"
import bcrypt from "bcrypt"
import crypto from "crypto"


const mUser = {
    createUser: async (user)=>{
        try {
            // 1. Verificar si el correo ya está registrado
            const check = "SELECT id FROM users WHERE email = ?";
            const [rows] = await db.execute(check, [user.email]);

            if (rows.length > 0) {
                // Lanzar un error personalizado para detectar luego
                const error = new Error("El correo ya está registrado.");
                error.code = 409;
                throw error;
            }

            // 2. Si no existe, insertar nuevo usuario
            const hash = await bcrypt.hash(user.password, 10)
            const add = "insert into users (name, email, password, activation_token, activation_expires) values (?,?,?,?,?)"
            await db.execute(add, [user.name, user.email, hash, user.activationToken, user.activationExpires])

        } catch (error) {
             throw error; // Lo pasamos al controlador
        }
    },
    oneUser: async ()=>{
        const add = "select * from users;"
        let [results] = await db.execute(add)
        return results
    },
    loginUser: async (email)=>{
        let [results] = await db.query("SELECT * FROM users WHERE email = ?;",[email])
        return results
    },
    updateUser: async (userId, cambios)=>{
         // Prepara dinámicamente la consulta
        const campos = [];
        const valores = [];
        console.log(cambios);
        for (const campo in cambios) {
            campos.push(`${campo} = ?`);
            valores.push(cambios[campo]);
        }

        valores.push(userId); // último valor: WHERE id = ?

        const sql = `UPDATE users SET ${campos.join(', ')} WHERE id = ?`;

        console.log("SQL:", sql);
        console.log("Valores:", valores);

        await db.execute(sql, valores);

        // await db.execute("UPDATE users SET profile_picture= ? WHERE id = ?;", [imagen, userId ])
    },
    perfilUser: async (userId)=>{
        const add = "select * from users where id =?;"
        let [results] = await db.execute(add, [userId])
        return results
    },
    adminUpdate: async (userId)=>{
        try {
            const add = `UPDATE users SET role = ?, status = ? WHERE id = ?`
            let [results] = await db.execute(add, [userId.rol, userId.estado, userId.id])
            return results
            
        } catch (error) {
            throw new Error("Error actualizando usuario en la base de datos");
        }
    },
    disableAccount: async (userId, estado)=>{
        try {
            const add = `UPDATE users SET status = ? WHERE id = ?;`
            await db.execute(add, [estado, userId])
            
        } catch (error) {
            throw new Error("Error actualizando usuario en la base de datos");
        }
    },
    activateAccount: async (token)=>{
        try {
            const [result] = await db.execute(
                "SELECT * FROM users WHERE activation_token = ? AND activation_expires > NOW()",
                [token]
            );
            if (result.length === 0) {
                const error = new Error("El token es inválido o ha expirado");
                error.status = 400;
                throw error;
            }

            await db.execute(
                "UPDATE users SET is_verified = 1, activation_token = NULL, activation_expires = NULL WHERE id = ?",
                [result[0].id]
            );
        } catch (error) {
            throw new Error("Error actualizando usuario en la base de datos");
        }
    }
}


export default mUser