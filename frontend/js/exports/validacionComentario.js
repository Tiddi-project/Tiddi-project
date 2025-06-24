const d = document
export default function validacionComentarios(form){

    const nombre = form.nombreComentario
    const email = form.correoComentario
    const comentario = form.mensajeComantario
  
    
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const comentarioReguex = /^.{10,1000}$/;
    
    
    nombre.addEventListener("input", validName)
    function validName(){
        let nameTest = nameRegex.test(nombre.value)
        if(nombre.value.trim() === ""){
            form.querySelector(".span__nombre").textContent = ""
            form.querySelector("#nombreComentario").style.outline = "none"
            return false
        }else if(!nameTest){
            form.querySelector(".span__nombre").textContent = "Por favor, ingresa un nombre válido."
            form.querySelector("#nombreComentario").style.outline = "3px solid red"
            return false
        }else{
            form.querySelector(".span__nombre").textContent = ""
            form.querySelector("#nombreComentario").style.outline = "none"
            return true
        }
    }
    // validacion email
    email.addEventListener("input", validEmail)
    function validEmail(){
        let emailTest = emailRegex.test(email.value)
        if(email.value.trim() === ""){
            form.querySelector(".span__correo").textContent = ""
            form.querySelector("#correoComentario").style.outline = "none"
            return false
        }else if(!emailTest){
            form.querySelector(".span__correo").textContent = "Por favor, ingresa un correo válido."
            form.querySelector("#correoComentario").style.outline = "3px solid red"
            return false
        }else{
            form.querySelector(".span__correo").textContent = ""
            form.querySelector("#correoComentario").style.outline = "none"
            return true
        }
    }

    // validacion comentarios
    comentario.addEventListener("input", validComment)
    function validComment(){
        let comentarioTest = comentarioReguex.test(comentario.value)
        if(comentario.value.trim() === ""){
            form.querySelector(".span__comentario").textContent = ""
            form.querySelector("#mensajeComantario").style.outline = "none"
            return false
        }else if(!comentarioTest){
            form.querySelector(".span__comentario").textContent = "Debe tener entre 10 y 1000 caracteres."
            form.querySelector("#mensajeComantario").style.outline = "3px solid red"
            return false
        }else{
            form.querySelector(".span__comentario").textContent = ""
            form.querySelector("#mensajeComantario").style.outline = "none"
            return true
        }
    }
    
    // Devuelve una función que chequea TODO y retorna true/false
    return function validateAll() {
        const ok  = validName()
                & validEmail()
                & validComment()
        return Boolean(ok);
    };
}
