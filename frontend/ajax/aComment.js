import toastComentario from "../js/exports/toastComentarios.js"

export const comment = async (form, contenedor) =>{
    try {
        const nombre = form.nombreComentario.value
        const correo = form.correoComentario.value
        const comentario = form.mensajeComantario.value

        let res = await fetch("http://localhost:3000/comentarios", {
            method: "POST",
            credentials: "include",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify({
                nombre,
                correo,
                comentario
            })
        })

        if(!res.ok) throw {status:res.status, message:res.statusText}
        let data = await res.json()
        let mensaje = data.message

        toastComentario(res.status, mensaje, contenedor)
        form.reset();          
    } catch (error) {
        let message = error.statusText || "Ha ocurrido un error"
        toastComentario(error.status, message, contenedor)
        console.log(`Error: ${error.status}: ${message}`);
    }
}