import aUser from "../ajax/aUser.js"
import conexion from "./exports/conexion.js"
import validacionRegistro from "./exports/registro-validacion.js"


const d = document,
w = window,
n = navigator
const $form = d.querySelector(".registro-form")

d.addEventListener("DOMContentLoaded", (e)=>{
    conexion()  //complete
    validacionRegistro($form)    //complete

    d.addEventListener("submit", (e)=>{
        // Metodo AJAX
        aUser.signinUser($form) 
    })
    
})