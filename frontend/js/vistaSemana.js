import {formateoDeTitulo,  obtenerRangoSemanal,  semanaAnterior, semanaSiguiente} from './exports/funciones.js';
import aTask from "../ajax/aTask.js"

export async function initVistaSemana() {

    const d = document
    const $visualizacionFechaSemana = d.querySelector(".SemanaActual")
    const $ContenedorSemanal = d.getElementById("semana")
    const $semanaAnterior = d.querySelector(".semanaAnterior")
    const $semanaSiguiente= d.querySelector(".semanaSiguiente")
    let FECHA = new Date()
    let fechaActual = FECHA.toLocaleDateString("co-Co",{
        year: "numeric",
        month: "long"
    })


    let semana = obtenerRangoSemanal(FECHA)
    $visualizacionFechaSemana.textContent = semana

    await aTask.viewCalendarWeek(FECHA, $ContenedorSemanal)



    // Si se le da click en la semana anterior
    $semanaAnterior.addEventListener("click", async (e)=>{
        FECHA = semanaAnterior(FECHA)

        $visualizacionFechaSemana.textContent = obtenerRangoSemanal(FECHA)
        await aTask.viewCalendarWeek(FECHA, $ContenedorSemanal)
    })

    // Si se le da click en la semana siguiente

    $semanaSiguiente.addEventListener("click", async (e)=>{
        FECHA = semanaSiguiente(FECHA)

        $visualizacionFechaSemana.textContent = obtenerRangoSemanal(FECHA)
        await aTask.viewCalendarWeek(FECHA, $ContenedorSemanal)

    })

    d.addEventListener("tareasActualizadas", async () => {
        console.log("La vista semana se actualiza...");
        await aTask.viewCalendarWeek(FECHA, $ContenedorSemanal)

    });

}   