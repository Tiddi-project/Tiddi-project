import aTask from "../ajax/aTask.js"
import { obtenerRangoSemanal, promedioSemanaAnterior, promedioSemanaSiguiente, semanaAnterior } from "./exports/funciones.js"

export async function initVistaEstadisticas() {
    const d = document
    let FECHA = new Date()
    const $graficaSemanaProductividad = d.getElementById("porcentaje__grafica-semana")
    const $tareasPorDiaSemana = d.querySelector(".desempEstadistica__uno-grafica")
    // Desplazamiento de semanas
    const $promedioSemanaAnterior = d.querySelector(".promedioSemanaAnterior")
    const $promedioSemanaSiguiente = d.querySelector(".promedioSemanaSiguiente")
    const $promedioSemanaActual = d.querySelector(".promedioSemanaActual")
    
    // cargar la vista de semana
    await aTask.taskForWeek(FECHA, $tareasPorDiaSemana, $graficaSemanaProductividad)

    // ---------------------------------------------------------- Desplazamiento entre semanas
    let semana = obtenerRangoSemanal(FECHA)
    $promedioSemanaActual.textContent = semana

    // Si se le da click en la semana anterior
    $promedioSemanaAnterior.addEventListener("click", async (e)=>{
        // FECHA = semanaAnterior(FECHA)
        FECHA = promedioSemanaAnterior(FECHA)
        console.log(FECHA);
        $promedioSemanaActual.textContent = obtenerRangoSemanal(FECHA)
        await aTask.taskForWeek(FECHA, $tareasPorDiaSemana, $graficaSemanaProductividad)
    })

    // Si se le da click en la semana siguiente

    $promedioSemanaSiguiente.addEventListener("click", async (e)=>{
        FECHA = promedioSemanaSiguiente(FECHA)
        console.log(FECHA);
        $promedioSemanaActual.textContent = obtenerRangoSemanal(FECHA)
        await aTask.taskForWeek(FECHA, $tareasPorDiaSemana, $graficaSemanaProductividad)

    })

}