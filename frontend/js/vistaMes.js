import {formateoDeTitulo, mesAnterior, mesSiguiente} from './exports/funciones.js';

import aTask from "../ajax/aTask.js"

export async function initVistaMes() {

    const d = document
    const $visualizacionMes = d.querySelector(".mesActual")
    const $mesAnterior = d.querySelector(".mesAnterior")
    const $mesSiguiente= d.querySelector(".mesSiguiente")
    const $calendario= d.getElementById("calendario")
    const FECHA = new Date()
    const fechaActual = FECHA.toLocaleDateString("co-Co",{
        year: "numeric",
        month: "long"
    })


    // aTask.getAll(FECHA, $calendario)
    await aTask.viewCalendarMonth(FECHA, $calendario)

    // muestra la fecha actual, abril de 2025
    $visualizacionMes.textContent = formateoDeTitulo(fechaActual)
    // Visualizacion del calendario en el DOM
    // calendario($calendario,FECHA)

    // Si se le da click en el mes anterior
    $mesAnterior.addEventListener("click", async (e)=>{
        mesAnterior(FECHA)

        $visualizacionMes.textContent = formateoDeTitulo(FECHA.toLocaleDateString("co-Co", {
            year: "numeric",
            month: "long"
        }))
        await aTask.viewCalendarMonth(FECHA, $calendario)

    })

    // Si se le da click en el mes siguiente
    $mesSiguiente.addEventListener("click", async (e)=>{
        mesSiguiente(FECHA)

        $visualizacionMes.textContent = formateoDeTitulo(FECHA.toLocaleDateString("co-Co", {
            year: "numeric",
            month: "long"
        }))
        await aTask.viewCalendarMonth(FECHA, $calendario)


    })

    d.addEventListener("tareasActualizadas", async () => {
        console.log("La vista mes se actualiza...");
        await aTask.viewCalendarMonth(FECHA, $calendario)
    });

}
    
