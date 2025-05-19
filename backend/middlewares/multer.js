import multer from "multer";
import path from "path";


/* Multer es la herramienta que usamos para manejar archivos subidos desde formularios 
(<input type="file">). */

//configurando el lugar donde queremos que se guarden las imágenes que los usuarios suben.
const storage = multer.diskStorage({    //guardar los archivos en el disco duro (no en memoria ni en la nube)
  destination: (req, file, cb) => { 
    // Esta función le dice a multer: “Guarda el archivo en la carpeta public/uploads/”
    cb(null, "public/uploads/");
    // cb es como un botón que tienes que presionar para continuar.Le pasas dos cosas
    // null si no hay error. O "public/uploads/" que es la ruta donde se va a guardar el archivo.
    // Ej: si el usuario sube una foto, irá a public/uploads/foto.jpg
  },
  filename: (req, file, cb) => {    // Aquí estamos creando un nombre único para el archivo
    const uniqueName = Date.now() + path.extname(file.originalname);
    // Date.now() genera un número como 1714673275690, que es la hora exacta.
    // path.extname(file.originalname) toma la extensión del archivo, por ejemplo .jpg o .png
    cb(null, uniqueName);
  }
});

const upload = multer({ storage }); // Creamos una instancia de multer usando la configuración anterior (storage).
// Ahora upload es una herramienta lista para usarse en nuestras rutas para aceptar imágenes.



export default upload;
/* Estamos exportando upload para que lo podamos usar en otros archivos, por ejemplo en nuestras rutas (routes/rTasks.js), con algo como:
import upload from "../middlewares/multer.js";
router.post("/tareas", upload.single("imagen"), crearTarea);
Por ende este es un middleware que se utilizara en el archivo de las rotas y no en el global
*/