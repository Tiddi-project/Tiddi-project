import conexion from "./exports/conexion.js"
import barraNavegacion from "./exports/scroll-index.js"


const d = document,
w = window,
n = navigator

d.addEventListener("DOMContentLoaded", (e)=>{
    barraNavegacion(".header")
    conexion()
})