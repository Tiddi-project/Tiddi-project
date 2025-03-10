import conexion from "./conexion.js"
import barraNavegacion from "./scroll-index.js"
import validacion from "./validacion-comentarios.js"


const d = document,
w = window,
n = navigator

d.addEventListener("DOMContentLoaded", (e)=>{
    barraNavegacion(".header")
    conexion()
    validacion()
})