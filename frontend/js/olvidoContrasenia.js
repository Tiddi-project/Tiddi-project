import aUser from "../ajax/aUser.js"

const d = document
const $toastContainer = d.querySelector(".toastBox")


d.addEventListener("DOMContentLoaded", ()=>{
    const $form = d.querySelector(".form__recuperacion")

    $form.addEventListener("submit", async(e)=>{
        e.preventDefault()
        const correoUsuario = $form.emailRecuperacion.value

        await aUser.olvidoCuenta(correoUsuario, $toastContainer)
        $form.reset()
    })


})