import db from "../config/db.js"
import bcrypt from "bcrypt"

const mUser = {
    createUser: async (user)=>{
        const hash = await bcrypt.hash(user.password, 10)
        const add = "insert into users (name, email, password) values (?,?,?)"
        await db.query(add, [user.name, user.email, hash])
    },
    oneUser: async ()=>{
        const add = "select * from users;"
        let [results] = await db.query(add)
        return results
    },
    loginUser: async (email)=>{
        let [results] = await db.query("SELECT * FROM users WHERE email = ?;",[email])
        return results
    }
}


export default mUser