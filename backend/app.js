import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import session from "express-session"
import path from "path"
import { fileURLToPath } from "url"
import routesTask from "./routes/rTasks.js"
import error from "./middlewares/error.js"


// crear el servidor
const app = express()
const PORT = 3000

// ruta actual
// const __dirname = process.cwd()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// uso de los middleware
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "../frontend")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routesTask)


app.use(error.e404);

// 📌 Middleware de manejo de errores (debe ir al final)
app.use(error.e400);
app.use(error.e500);

app.listen(PORT, ()=>{
    console.log(`Conexion establecida en http://localhost:${PORT}`);
})