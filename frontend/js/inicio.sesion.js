import aUser from "../ajax/aUser.js"
import conexion from "./exports/conexion.js"
import validacionInicioSesion from "./exports/inicio-sesion-validacion.js"


const d = document
// w = window,
// n = navigator
const $form = d.querySelector(".acceso-form")


d.addEventListener("DOMContentLoaded", (e)=>{
    conexion()
    validacionInicioSesion($form)
    
    // ajax
    d.addEventListener("submit", (e)=>{
        e.preventDefault()
        if (e.target.matches(".acceso-form")) {
            // alert("el submit si esta funcionando")
            console.log("Llamando a loginUser...");
            aUser.loginUser($form)
            // aUser.loginUser(e.target); // Pasar el formulario correcto
        }
    })
})
