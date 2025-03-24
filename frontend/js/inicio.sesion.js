import aUser from "../ajax/aUser.js"
import conexion from "./exports/conexion.js"
import validacionInicioSesion from "./exports/inicio-sesion-validacion.js"


const d = document,
w = window,
n = navigator
const $form = d.querySelector(".acceso-form")


d.addEventListener("DOMContentLoaded", (e)=>{
    conexion()
    validacionInicioSesion($form)


    // Ajax
    $form.addEventListener("submit", (e)=>{
        e.preventDefault()
        aUser.loginUser($form)

    })
})