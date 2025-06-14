import aUser from "../ajax/aUser.js"
import conexion from "./exports/conexion.js"
import validacionInicioSesion from "./exports/inicio-sesion-validacion.js"
// import toast from "./exports/toast.js"
// import toast from 'toast.js';

const d = document
// w = window,
// n = navigator
const $form = d.querySelector(".acceso-form")
const $toastContainer = d.querySelector(".toastBox")


d.addEventListener("DOMContentLoaded", async (e)=>{
    conexion()
    validacionInicioSesion($form)
    
    // ajax
    d.addEventListener("submit", (e)=>{
        e.preventDefault()
        if (e.target.matches(".acceso-form")) {
            // alert("el submit si esta funcionando")
            
            aUser.loginUser($form, $toastContainer)
            // aUser.loginUser(e.target); // Pasar el formulario correcto
        }
    })

    d.addEventListener("click", (e)=>{
        if(e.target.matches(".eye-close")){
            d.querySelector(".eye-close").classList.toggle("eye-open")
            if (e.target.classList.contains("eye-open")) {
                d.getElementById("password").setAttribute("type", "text")
            } else {
                d.getElementById("password").setAttribute("type", "password")
            }
        }
        if(e.target.className === "enlace"){
            console.dir(e.target.className);

        }
        
    })
})
