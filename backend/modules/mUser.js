import db from "../config/db.js"
import bcrypt from "bcrypt"

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
            const add = "insert into users (name, email, password) values (?,?,?)"
            await db.execute(add, [user.name, user.email, hash])

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
    }
}


export default mUser