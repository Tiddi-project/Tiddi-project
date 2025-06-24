import aUser from "../ajax/aUser.js"
import { checkAuth } from "../ajax/auth.js"

export async function initVistaPerfil() {
    const d = document
    const $fotoDePerfilBtn = d.querySelector(".fotoPerfil__upload")
    const $fotoDePerfilImg = d.getElementById("fotoDePerfilUsuario")
    const $cambiarContrasenia = d.querySelector(".cambiarContrasenia")
    const $editarInformacionUsuario = d.querySelector(".editarInformacion")
    const $formularioPerfil = d.querySelector(".perfilForm")
    const $mensajeAdvertencia = d.querySelector(".fotoPerfil__mensajeAdvertencia")
    const $nombreImagen = d.querySelector(".fotoPerfil__nombreArchivo")
    const $fotoDePerfil = d.querySelector(".fotoDePerfil")
    const $modalEliminacion = d.querySelector(".modal__desabilitarCuenta")


    // peticion para la asignacion de valores
    let datosDeUsuario = await aUser.perfilUser()
    console.log(datosDeUsuario);
    // Asignacion de valores en los inputs
    if(!datosDeUsuario) return
    $formularioPerfil.nombrePerfil.value = datosDeUsuario.name
    $formularioPerfil.emailPerfil.value = datosDeUsuario.email
    $formularioPerfil.querySelector(".fotoPerfil__imagen-foto").src = datosDeUsuario.profile_picture || '../assets/foto-de-perfil.png';
    
    // Activa la busqueda de imagenes
    $fotoDePerfilBtn.addEventListener("click", (e)=>{
        $fotoDePerfilImg.click()
    })

    // permite el ingreso de la imagen despues de algunas validaciones
    $fotoDePerfilImg.addEventListener("change", (e)=>{
        const file = e.target.files[0];
        if (!file) return;

        // Validación de tipo de archivo
        if (!file.type.startsWith("image/")) {
            // Por favor selecciona un archivo de imagen válido.
            $mensajeAdvertencia.textContent = "Por favor selecciona un archivo de imagen válido."
            $mensajeAdvertencia.style.display = "block"
            return;
        }else{
            $mensajeAdvertencia.style.display = "none"
            // $nombreImagen.textContent = file.name
        }

        // Validación de tamaño máximo 2MB
        const MAX_SIZE_MB = 2;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            $mensajeAdvertencia.textContent = `La imagen debe pesar menos de ${MAX_SIZE_MB}MB.`
            $mensajeAdvertencia.style.display = "block"
            return;
        }else{
            $mensajeAdvertencia.style.display = "none"
            $nombreImagen.textContent = file.name
        }

        // ✅ Vista previa con FileReader
        const reader = new FileReader();
        reader.onload = () => {
            let output = d.querySelector(".fotoPerfil__imagen-foto");
            output.src = reader.result;
            output.style.display = "block";
        };
        reader.readAsDataURL(file);
    })

    // permite la edicion de la informacion en los inputs
    $editarInformacionUsuario.addEventListener("click", (e)=>{
        const nombreInput = d.getElementById("nombrePerfil")
        let texto = $editarInformacionUsuario.querySelector("span")
        if(texto.textContent === "Editar"){
            nombreInput.removeAttribute("disabled")
            texto.textContent = "Cancelar"
        }else if(texto.textContent === "Cancelar"){
            nombreInput.setAttribute("disabled", "")
            texto.textContent = "Editar"
        }
    })
    // permite el cambio de la contraseña
    $cambiarContrasenia.addEventListener("click", (e)=>{
        const contraseniaAnterior = d.getElementById("passwordAfter")
        const contraseniaNueva = d.getElementById("passwordNew")
        const contenedorContrasenia = d.querySelector(".informacionPerfil-dos")

        // Habilita la vista de la contraseña
        const activo = contenedorContrasenia.classList.toggle("passActive")
        if(activo){
            // permite escribir y que se vuelva requerido
            contraseniaAnterior.setAttribute("required","")
            contraseniaAnterior.removeAttribute("disabled")

            // permite escribir y que se vuelva requerido
            contraseniaNueva.setAttribute("required","")
            contraseniaNueva.removeAttribute("disabled")
        }else{
            // Ocultar y deshabilitar los campos
            contraseniaAnterior.setAttribute("disabled", "");
            contraseniaAnterior.removeAttribute("required");
            contraseniaAnterior.value = ""; // Limpia por seguridad

            contraseniaNueva.setAttribute("disabled", "");
            contraseniaNueva.removeAttribute("required");
            contraseniaNueva.value = "";
        }


    })

    $formularioPerfil.addEventListener("submit", async (e)=>{
        e.preventDefault()

        const hayImagen = $fotoDePerfilImg.files[0];
        const nombreHabilitado = !$formularioPerfil.nombrePerfil.disabled;
        const passwordActiva = d.querySelector(".informacionPerfil-dos").classList.contains("passActive");

        if (!hayImagen && !nombreHabilitado && !passwordActiva) {
            alert("No realizaste ningún cambio.");
            return;
        }

        await aUser.updateUser(datosDeUsuario, $formularioPerfil)
        
        const user = await checkAuth();         
        $fotoDePerfil.src = user.profile_picture || '../assets/foto-de-perfil.png';
    })
    d.addEventListener("click", async (e)=>{
        if(e.target.closest(".informacionPersonal__btn")){
            $modalEliminacion.classList.add("desabilitarCuentaActive")
        }
        if(e.target.closest(".desabilitarCuenta-cancelar")){
            $modalEliminacion.classList.remove("desabilitarCuentaActive")
        }
        if(e.target.closest(".desabilitarCuenta-aceptar")){
            await aUser.desabilitarCuenta(datosDeUsuario)
            $modalEliminacion.classList.remove("desabilitarCuentaActive")
            // let estado = await checkAuth()
            // if(estado.status === "inactivo"){
                //     return
                // }
            window.location.href = "http://localhost:3000/inicio-sesion.html"; 
        }
    })
}
