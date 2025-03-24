const error = {
    e400: (err, req, res, next) => {
        res.status(400)
        .json({
        title: "Error 400 Bad Request",
        message: "La solicitud tiene datos incorrectos o mal formateados",
        });
        
    },
    e401: (err, req, res, next) => {
        res.status(401)
        .json({
        title: "Error 401 Unauthorized",
        message: "Carece de credenciales válidas de autenticación para el recurso solicitado",
        });
        
    },
    e403: (err, req, res, next) => {
        res.status(403)
        .json({
        title: "Error 403 Forbidden",
        message: " El servidor ha recibido y ha entendido la petición, pero rechaza enviar una respuesta.",
        });
        
    },
    e404: (err, req, res, next) => {
        res.status(404).json({
        title: "Error 404 Not Found",
        message: "El recurso que estás buscando no existe.",
        });
        
    },
    e500: (err, req, res)=>{
        res.status(500).json({
            title: "Error 500 Internal Server",
            message: err.message,
          });
    }
}

export default error;