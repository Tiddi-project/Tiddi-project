import conexion from "./conexion.js"
import validacionInicioSesion from "./inicio-sesion-validacion.js"


const d = document,
w = window,
n = navigator

d.addEventListener("DOMContentLoaded", (e)=>{
    conexion()
    validacionInicioSesion()
})