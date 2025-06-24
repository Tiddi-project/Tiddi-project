import aTask from "../../ajax/aTask.js";


export function formateoDeTitulo(datos){
    return datos
    .split("")
    .map((letra, index)=> index ===0 ? letra.toUpperCase():letra)
    .join("")
    
}
export function formatearFecha(fecha) {
    return fecha.toISOString().split("T")[0]; // Ejemplo: "2025-05-01"
}
export function mesAnterior(fecha){
    return fecha.setMonth(fecha.getMonth() - 1)
    let nuevaFecha = fecha.toLocaleDateString("co-Co", {
        year: "numeric",
        month: "long"
    })
    return nuevaFecha
}
export function mesSiguiente(fecha){
    return fecha.setMonth(fecha.getMonth() + 1)
    let nuevaFecha = fecha.toLocaleDateString("co-Co", {
        year: "numeric",
        month: "long"
    })
    return nuevaFecha
}
export function parseFechaSQL(fechaSQL) {
    return new Date(fechaSQL.replace(" ", "T"));
}
export function semanaAnterior(fecha){
    // variables para el mes y año 
    let anio = fecha.getFullYear()
    let mes = fecha.getMonth()

    // determinacion de fechas
    let diaCorrespondienteEnLaSemana = fecha.getDay()
    let domingo = fecha.getDate() - diaCorrespondienteEnLaSemana


    return new Date(anio, mes, domingo - 7)
    /*
    // Crear una copia para no modificar la fecha original
    // let copiaFecha = new Date(fecha);

    // // Día de la semana actual (0=domingo, 1=lunes, ...)
    // let diaSemana = copiaFecha.getDay();

    // // Retroceder al domingo de la semana actual
    // copiaFecha.setDate(copiaFecha.getDate() - diaSemana);

    // // Retroceder 7 días más para ir a la semana anterior
    // copiaFecha.setDate(copiaFecha.getDate() - 7);

    // return copiaFecha;
    */
}
export function semanaSiguiente(fecha){
    // variables para el mes y año 
    let anio = fecha.getFullYear()
    let mes = fecha.getMonth()

    // determinacion de fechas
    let diaCorrespondienteEnLaSemana = fecha.getDay()
    let domingo = fecha.getDate() - diaCorrespondienteEnLaSemana


    return new Date(anio, mes, domingo + 7)
    
}
export function diaAnterior(fecha){

    const nuevaFecha = new Date(fecha); // clonar para no mutar el original
    nuevaFecha.setDate(nuevaFecha.getDate() - 1);
    return nuevaFecha
   
}
export function diaSiguiente(fecha){
    const nuevaFecha = new Date(fecha); // clonar para no mutar el original
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    return nuevaFecha
    
}
export function promedioSemanaAnterior(fecha){
    // variables para el mes y año 
    let anio = fecha.getFullYear()
    let mes = fecha.getMonth()

    // determinacion de fechas
    let diaCorrespondienteEnLaSemana = fecha.getDay()
    let domingo = fecha.getDate() - diaCorrespondienteEnLaSemana


    return new Date(anio, mes, domingo - 7)
}
export function promedioSemanaSiguiente(fecha){
    // variables para el mes y año 
    let anio = fecha.getFullYear()
    let mes = fecha.getMonth()

    // determinacion de fechas
    let diaCorrespondienteEnLaSemana = fecha.getDay()
    let domingo = fecha.getDate() - diaCorrespondienteEnLaSemana

    return new Date(anio, mes, domingo + 7)
}
export function obtenerRangoSemanal(fecha) {
    const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

    const anio = fecha.getFullYear();
    const mes = fecha.getMonth();
    const diaSemana = fecha.getDay(); // 0 = domingo
    const primerDia = new Date(anio, mes, fecha.getDate() - diaSemana);
    const ultimoDia = new Date(anio, mes, fecha.getDate() - diaSemana + 6);

    const opciones = { day: "numeric", month: "long" };
    const opcionesFinal = { ...opciones, year: "numeric" };

    const inicio = primerDia.toLocaleDateString("es-CO", opciones);       // ej: "29 de diciembre"
    const fin = ultimoDia.toLocaleDateString("es-CO", opcionesFinal);     // ej: "4 de enero de 2025"

    return `Semana del ${inicio} al ${fin}`;
}

// ------- Inicio de rangos de mes

export function promedioMesAnterior(fecha) {
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth();
    return new Date(anio, mes - 1, 1); // Primer día del mes anterior
}
export function promedioMesSiguiente(fecha) {
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth();
    return new Date(anio, mes + 1, 1); // Primer día del mes siguiente
}
export function obtenerRangoMensual(fecha) {
    return `Mes de ${fecha.toLocaleDateString("es-CO", { month: "long", year: "numeric" })}`;
}

// -------- Fin de rango de mes
export function graficaProductividad (svgCirculo, datos){
    let totalTasks = datos.totalTareasEnLaSemana;
    let completedTasks = datos.totalTareasCompletadas;
    console.log(totalTasks);
    console.log(completedTasks);
    const circumference = 2 * Math.PI * 50; // Longitud total del círculo

    let percent = 0;

    if (totalTasks > 0) {
        percent = (completedTasks / totalTasks) * 100;
    }

    // let percent = (completedTasks / totalTasks) * 100;
    let offset = circumference - (percent / 100) * circumference;

    svgCirculo.style.strokeDashoffset = offset;
}


//  funcion para renderizar vistas
// export async function renderizarLaVistaActual(objeto) {
//     const vistaActual =  document.getElementById("main-content").dataset.vistaActiva;
//     console.log(vistaActual);
//     if(!vistaActual) return

//     switch(vistaActual){
//         case "vistas/vistaDia.html":
//             await aTask.getAll(objeto.FECHA,{
//                 $taskList: objeto.$taskList ,
//                 $taskContainer: objeto.$taskContainer ,
//                 $template: objeto.$template ,
//                 $fragment: objeto.$fragment
//             })
//             break;
        
//           case "vistas/vistaSemana.html":
//             await aTask.viewCalendarWeek(objeto.FECHA, objeto.$ContenedorSemanal)
//             break;
        
//           case "vistas/vistaMes.html":
//             await aTask.viewCalendarWeek(objeto.FECHA, objeto.$ContenedorSemanal)
//             break;

//     }
// }
