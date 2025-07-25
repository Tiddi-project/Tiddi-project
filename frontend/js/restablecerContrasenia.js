import aUser from "../ajax/aUser.js"

const d = document
const $toastContainer = d.querySelector(".toastBox")
const $form = d.querySelector(".form__reset")


d.addEventListener("DOMContentLoaded", ()=>{

    $form.addEventListener("submit", async(e)=>{
        e.preventDefault()
        
        const token = new URLSearchParams(window.location.search).get("token");
        const newPassword = $form.newPassword.value;

        // const correoUsuario = $form.emailRecuperacion.value
        // await aUser.olvidoCuenta(correoUsuario, $toastContainer)
        await aUser.recuperacionCuenta({token, newPassword}, $toastContainer)
        setTimeout(()=>{
            window.location.href = "http://localhost:3000/inicio-sesion.html";
        }, 5000)
        $form.reset()
    })

    d.addEventListener("click", (e)=>{
        if(e.target.matches(".eye-close")){
            d.querySelector(".eye-close").classList.toggle("eye-open")
            if (e.target.classList.contains("eye-open")) {
                d.getElementById("newPassword").setAttribute("type", "text")
            } else {
                d.getElementById("newPassword").setAttribute("type", "password")
            }
        }
    })

})