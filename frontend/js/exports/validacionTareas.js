export default function validarTareas(formulario){
    
    // campos a validar
    const titulo = formulario.querySelector("#title-task")
    const descripcion = formulario.querySelector("#description-task")

    // Regex
    const regexTitulo = /^[a-zA-Z0-9ÁÉÍÓÚÑáéíóúñüÜ .,()\/-:]{1,255}$/
    const regexDescripcion = /^[\s\S]{0,1000}$/
    
    titulo.addEventListener("keyup", validTitulo)
    descripcion.addEventListener("input", validDescripcion);

    function validTitulo(){
        let tituloValor = titulo.value
        let tituloTest = regexTitulo.test(tituloValor)
        console.log(tituloValor, tituloTest);
        if(tituloValor === ""){
            formulario.querySelector(".testTaskTitleFail").textContent = " "
            return false
        }else if(!tituloTest){
            formulario.querySelector(".testTaskTitleFail").textContent = "El título contiene caracteres no válidos o supera los 255 caracteres"
            return false
        }else {
            formulario.querySelector(".testTaskTitleFail").textContent = " "
            return true
        }
    }

    function validDescripcion() {
        const valor = descripcion.value;
        const esValido = regexDescripcion.test(valor);
        if (!esValido) {
            descripcion.classList.add("descInvalido");
            formulario.querySelector(".testTaskDescFail").textContent = "La descripción no puede superar 1000 caracteres."
            return false;
        } else {
            descripcion.classList.remove("descInvalido");
            formulario.querySelector(".testTaskDescFail").textContent = " "
            return true;
        }
    }

    return function validateAll() {
        const ok  = validTitulo()
                & validDescripcion()
        return Boolean(ok);
    };
}