import db from "../config/db.js"
import bcrypt from "bcrypt"

const mUser = {
    createUser: async (user)=>{
        try {
            
            const hash = await bcrypt.hash(user.password, 10)

            const add = "insert into users (name, email, password) values (?,?,?)"

            let [results] = await db.execute(add, [user.name, user.email, hash])
            
            return results
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                console.log("Entra en el error del modelo")
                throw new Error("El correo ya está en uso")
            }
            throw error 
        }
    },
    oneUser: async ()=>{
        const add = "select * from users;"
        let [results] = await db.query(add)
        return results
    },
    loginUser: async (email)=>{
        let [results] = await db.execute("SELECT * FROM users WHERE email = ?;",[email])
        return results
    }
}


export default mUser