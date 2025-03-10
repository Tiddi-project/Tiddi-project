import conexion from "./conexion.js"
import validacionRegistro from "./registro-validacion.js"


const d = document,
w = window,
n = navigator

d.addEventListener("DOMContentLoaded", (e)=>{
    conexion()
    validacionRegistro()
    
})