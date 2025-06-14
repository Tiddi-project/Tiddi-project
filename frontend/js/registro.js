import aUser from "../ajax/aUser.js"
import conexion from "./exports/conexion.js"
import validacionRegistro from "./exports/registro-validacion.js"


const d = document,
w = window,
n = navigator
const $form = d.querySelector(".registro-form")
const $toastContainer = d.querySelector(".toastBox")
const $formRegistro = d.querySelector(".registro-form")

d.addEventListener("DOMContentLoaded", (e)=>{
    conexion()  //complete
    validacionRegistro($form)    //complete

    $formRegistro.addEventListener("submit", (e)=>{
        e.preventDefault()
        if(!validacionRegistro($form)) return
        // Metodo AJAX
        aUser.signinUser($form, $toastContainer) 
        // window.location.reload()
    })
    d.addEventListener("click", (e)=>{
            if(e.target.matches(".eye-close.uno")){
                d.querySelector(".uno").classList.toggle("eye-open")
                if (e.target.classList.contains("eye-open")) {
                    d.querySelector(".passwordUno").setAttribute("type", "text")
                } else {
                    d.querySelector(".passwordUno").setAttribute("type", "password")
                }
            }
            if(e.target.matches(".eye-close.dos")){
                console.log("funciona");
                d.querySelector(".dos").classList.toggle("eye-open")

                if (e.target.classList.contains("eye-open")) {
                    d.querySelector(".passwordDos").setAttribute("type", "text")
                } else {
                    d.querySelector(".passwordDos").setAttribute("type", "password")
                }
            }
        })
    
})