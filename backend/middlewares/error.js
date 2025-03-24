const error = {
    e400: (err, req, res, next) => {
        res.status(400)
        .json({
        title: "Error 400 Bad Request",
        message: "La solicitud tiene datos incorrectos o mal formateados",
        });
        
    },
    e404: (err, req, res, next) => {
        res.status(404)
        .json({
        title: "Error 404 Not Found",
        message: "El recurso que estás buscando no existe.",
        });
        
    },
    e500: (err, req, res, next)=>{
        res.status(500).json({
            title: "Error 500 Internal Server",
            message: err.message,
          });
    }
}

export default error;