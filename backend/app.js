import express from "express"
import session from "express-session"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import error from "./middlewares/error.js"
import routesUser from "./routes/rUsers.js"
import routesTask from "./routes/rTasks.js"
import routesCheck from "./routes/rAuth.js"
import routesSubtask from "./routes/rSubtask.js"
import {isAuthenticated} from "./middlewares/auth.js"


// crear el servidor
const app = express()
const PORT = 3000

// ruta actual
// const __dirname = process.cwd()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// uso de los middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
// app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "../frontend")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
  session({
    secret: "mi_llave",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,  // Cambia a 'true' en producción si usas HTTPS
      sameSite: 'lax',  // 'strict' o 'lax' dependiendo del comportamiento que quieras
      maxAge: 1000 * 60 * 60 * 24,  // Expira después de 24 horas
    },
  })
);


app.use(routesCheck)
app.use(routesUser)
app.use(isAuthenticated, routesTask)
app.use(isAuthenticated, routesSubtask)



// 📌 Middleware de manejo de errores (debe ir al final)
app.use(error.e400);
app.use(error.e401);
app.use(error.e403);
app.use(error.e404);
app.use(error.e500);

app.listen(PORT, ()=>{
    console.log(`Conexion establecida en http://localhost:${PORT}`);
})