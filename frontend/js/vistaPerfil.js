import aUser from "../ajax/aUser.js"

export async function initVistaPerfil() {
    const d = document
    const $fotoDePerfilBtn = d.querySelector(".fotoPerfil__upload")
    const $fotoDePerfilImg = d.getElementById("fotoDePerfilUsuario")
    const $cambiarContrasenia = d.querySelector(".cambiarContrasenia")
    const $editarInformacionUsuario = d.querySelector(".editarInformacion")
    const $formularioPerfil = d.querySelector(".perfilForm")


    let datosDeUsuario = await aUser.perfilUser($formularioPerfil)
    console.log(datosDeUsuario);
    $formularioPerfil.nombrePerfil.value = datosDeUsuario.name
    $formularioPerfil.emailPerfil.value = datosDeUsuario.email
    $formularioPerfil.querySelector(".fotoPerfil__imagen-foto").src = datosDeUsuario.profile_picture
    // await aUser.getOneUser(datosDeUsuario, $formularioPerfil)

    // const user = await checkAuth(); // Espera a que la autenticación termine antes de continuar
    // console.log(user);

    $fotoDePerfilBtn.addEventListener("click", (e)=>{
        $fotoDePerfilImg.click()
    })
    $fotoDePerfilImg.addEventListener("change", (e)=>{
        console.log(e.target.files[0]);
        const file = e.target.files[0]
        const reader =  new FileReader()
        if(!file) return
        reader.onload = ()=>{
            let output = d.querySelector(".fotoPerfil__imagen-foto")
            output.src = reader.result
            output.style.display = "block"
        }

        reader.readAsDataURL(file)
    })
    $editarInformacionUsuario.addEventListener("click", (e)=>{
        console.log("funciona el boton de editar");
        // console.dir($editarInformacionUsuario);
        const nombreInput = d.getElementById("nombrePerfil")
        const correoInput = d.getElementById("emailPerfil")

        let texto = $editarInformacionUsuario.querySelector("span")
        if(texto.textContent === "Editar"){
            console.log("esta en editar");
            nombreInput.removeAttribute("disabled")
            correoInput.removeAttribute("disabled")
            texto.textContent = "Cancelar"
        }else if(texto.textContent === "Cancelar"){
            console.log("esta en cancelar");
            nombreInput.setAttribute("disabled", "")
            correoInput.setAttribute("disabled", "")
            texto.textContent = "Editar"

        }
    })
    $cambiarContrasenia.addEventListener("click", (e)=>{
        console.log(e.target.matches(".informacionPersonal__btn.footerBtn.cambiarContrasenia"));
        
        const contraseniaAnterior = d.getElementById("passwordAfter")
        const contraseniaNueva = d.getElementById("passwordNew")
        const contenedorContrasenia = d.querySelector(".informacionPerfil-dos")

        // Habilita la vista de la contraseña
        // contenedorContrasenia.style.display = "flex"
        contenedorContrasenia.classList.toggle("passActive")

        // permite escribir y que se vuelva requerido
        contraseniaAnterior.setAttribute("required","")
        contraseniaAnterior.removeAttribute("disabled")

        // permite escribir y que se vuelva requerido
        contraseniaNueva.setAttribute("required","")
        contraseniaNueva.removeAttribute("disabled")
    })

    $formularioPerfil.addEventListener("submit", async (e)=>{
        e.preventDefault()
        let datosDeUsuario = await aUser.perfilUser($formularioPerfil)
        console.log(datosDeUsuario);
        await aUser.updateUser(datosDeUsuario, $formularioPerfil)
    })
}
