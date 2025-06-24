import aTask from "../ajax/aTask.js"
import { obtenerRangoSemanal, promedioSemanaAnterior, promedioSemanaSiguiente, semanaAnterior, obtenerRangoMensual, mesAnterior, mesSiguiente, promedioMesAnterior, promedioMesSiguiente } from "./exports/funciones.js"

export async function initVistaEstadisticas() {
    const d = document
    let FECHA = new Date()
    const $graficaSemanaProductividad = d.getElementById("porcentaje__grafica-semana")
    const $tareasPorDiaSemana = d.querySelector(".desempEstadistica__uno-grafica-semana")
    // Desplazamiento de semanas
    const $promedioSemanaAnterior = d.querySelector(".promedioSemanaAnterior")
    const $promedioSemanaSiguiente = d.querySelector(".promedioSemanaSiguiente")
    const $promedioSemanaActual = d.querySelector(".promedioSemanaActual")

    // Desplazamiento de semanas
    const $promedioMesAnterior = d.querySelector(".promedioMesAnterior")
    const $promedioMesSiguiente = d.querySelector(".promedioMesSiguiente")
    const $promedioMesaActual = d.querySelector(".promedioMesActual")

    // Nuevas
    // Botones para cambiar de vista
    const $tabSemana = document.querySelector(".tab-semana");
    const $tabMes = document.querySelector(".tab-mes");

    const $vistaSemana = document.querySelector(".desempEstadistica--semana");
    const $vistaMes = document.querySelector(".desempEstadistica--mes");
    const $graficaMes = document.getElementById("porcentaje__grafica-mes");
    const $contenedorMensual = document.querySelector(".desempEstadistica__uno-grafica-mes");
    // -----------------------------------------------------------------------------Inicio de la nueva
    $tabSemana.addEventListener("click", async() => {
        $tabSemana.classList.add("active");
        $tabMes.classList.remove("active");
        $vistaSemana.style.display = "grid";
        $vistaMes.style.display = "none";

        // cargar la vista de semana
        await aTask.taskForWeek(FECHA, $tareasPorDiaSemana, $graficaSemanaProductividad)
    });
    
    $tabMes.addEventListener("click", async () => {
        $tabMes.classList.add("active");
        $tabSemana.classList.remove("active");
        $vistaSemana.style.display = "none";
        $vistaMes.style.display = "grid";

        
        // carga la vista mensual
        await aTask.taskForMonth(FECHA, $contenedorMensual, $graficaMes)

    });
    // ------------------------------------------------------------------------------- Fin de la nueva
    
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

    // ---------------------------------------------------------- Desplazamiento entre meses
    let mes = obtenerRangoMensual(FECHA)
    $promedioMesaActual.textContent = mes

    // Si se le da click en la semana anterior
    $promedioMesAnterior.addEventListener("click", async (e)=>{
        // FECHA = semanaAnterior(FECHA)
        FECHA = promedioMesAnterior(FECHA)
        console.log(FECHA);
        $promedioMesaActual.textContent = obtenerRangoMensual(FECHA)
        await aTask.taskForMonth(FECHA, $contenedorMensual, $graficaMes)
    })

    // Si se le da click en la semana siguiente
    $promedioMesSiguiente.addEventListener("click", async (e)=>{
        FECHA = promedioMesSiguiente(FECHA)
        console.log(FECHA);
        $promedioMesaActual.textContent = obtenerRangoMensual(FECHA)
        await aTask.taskForMonth(FECHA, $contenedorMensual, $graficaMes)
    })

}