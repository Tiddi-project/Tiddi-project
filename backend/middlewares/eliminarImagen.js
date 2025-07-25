import fs from "fs";
import path from "path";


// Este es un modulo que estaremos realizando para la eliminacion de imagenes cuando se
// edite, elimine tareas y cuando se cambie la foto de perfil
const eliminarImagen = (nombreArchivo) => {
  if (!nombreArchivo) return;

  const ruta = path.join("public/uploads", nombreArchivo);
  fs.unlink(ruta, (err) => {
    if (err) {
      console.warn("No se pudo eliminar la imagen:", nombreArchivo, err.message);
    } else {
      console.log("Imagen eliminada:", nombreArchivo);
    }
  });
};

export default eliminarImagen;