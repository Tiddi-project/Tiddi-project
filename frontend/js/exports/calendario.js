import { graficaProductividad } from "./funciones.js";

// se creara una funcion para la visualizacion del calendario
export  function calendario(contenedor, fecha, eventos){
    // Limpiar los dias enteriores
    contenedor.innerHTML = "";
    // determinacion de año y mes
    let anio = fecha.getFullYear()
    let mes = fecha.getMonth()

    // dias del mes
    let primerDia = new Date(anio, mes, 1);
    let ultimoDia = new Date(anio, mes+1, 0)
    let totalDias = ultimoDia.getDate();
    let inicioSemana = primerDia.getDay(); // Domingo = 0, lunes = 1, etc.

    // Espacios vacíos antes del primer día
    for (let i = 0; i < inicioSemana; i++) {
        contenedor.innerHTML += `
        <div class="calendario__dia">
            <h5></h5>
        </div>`;
    }
  

    // Días del mes con eventos
    for (let i = 1; i <= totalDias; i++) {
        
        // comparamos las fechas
        // const fechaComparar = new Date(anio, mes, i).toISOString().split('T')[0];
        const fechaComparar = new Date(anio, mes, i).toLocaleDateString("sv-SE");
        const hoy = new Date().toLocaleDateString("sv-SE");
        const esHoy = fechaComparar === hoy ? "dia-actual" : "";
        

        // Filtramos los eventos del día
        const eventosDelDia =  eventos.filter(evento => {
            // const eventoFecha = new Date(evento.fecha).toISOString().split('T')[0];
            const eventoFecha = new Date(evento.deadline).toLocaleDateString("sv-SE"); // "2025-05-01"
            return eventoFecha === fechaComparar
        });

        // Si hay eventos para ese día, los mostramos
        let eventosHTML = '';
        const maxVisible = 2;
        /*
        if (eventosDelDia.length > 0) {
            eventosHTML = eventosDelDia
            .map(evento => `<div class="evento" style="background-color: #${evento.color};">${evento.title}</div>`).
            join("");
        }*/
       if (eventosDelDia.length > 0) {
            eventosDelDia.forEach((evento, index) => {
                if (index < maxVisible) {
                    eventosHTML += `
                        <div class="evento" style="background-color: #${evento.color};">
                            <input type="checkbox" class="check__tareaSemana" id="${evento.task_id}" ${evento.complete===1 ? "checked" : ""}>
                            <label for="${evento.task_id}"></label>
                            <div class="evento__content">${evento.title}</div>
                        </div>`;
                }
            });
            const eventosOcultos = eventosDelDia.length - maxVisible;
            if (eventosOcultos > 0) {
                eventosHTML += `
                    <div class="evento evento__extra">
                        +${eventosOcultos}
                    </div>`;
            }
        }

        contenedor.innerHTML += `
        <div class="calendario__dia">
            <div class="eventos">${eventosHTML}</div>
            <h5 class="${esHoy}">${i}</h5>
        </div>`;
    }

    

}

export function calendarioPorSemana(contenedor, fecha, eventos){
    contenedor.innerHTML = "";
    // console.log(eventos);
    // array para los dias de la semana
    let diasSemana = []

    // variables para el mes y año 
    let anio = fecha.getFullYear()
    let mes = fecha.getMonth()

    // determinacion de fechas
    let diaCorrespondienteEnLaSemana = fecha.getDay()
    let domingo = fecha.getDate() - diaCorrespondienteEnLaSemana

    // creacion de array
    for(let i=0; i < 7; i++){
        // let fechaPorDia = new Date(anio, mes, domingo + i).toISOString()
        let fechaPorDia = new Date(anio, mes, domingo + i)
        diasSemana.push(fechaPorDia)
    }

    const hoy = new Date().toISOString().split("T")[0];
    console.log(hoy);

    diasSemana.forEach(dia=>{
        const fechaCorta = new Date(dia).toISOString().split("T")[0];
        let diaNumero = new Date(fechaCorta).getDate()
        let diaHoy = new Date(hoy).getDate()
        
        const esHoy = diaNumero === diaHoy;

        const eventosDelDia = eventos.filter((evento) => {
            // evento.deadline.startsWith(fechaCorta)
            if(!evento.deadline) return false;
            // const eventoFecha = new Date(evento.deadline).toISOString().split("T")[0];
            const eventoFecha = new Date(evento.deadline).toLocaleDateString("sv-SE"); // "2025-05-01"
            return eventoFecha === fechaCorta;
        }
        );
        // console.log(eventosDelDia);
        let eventosHTML = eventosDelDia
        .map(evento => 
            `<div class="evento" style="background-color: #${evento.color};">
                <input type="checkbox" class="check__tareaSemana" id="${evento.task_id}" ${evento.complete===1 ? "checked" : ""}>
                <label for="${evento.task_id}"></label>
                <div class="evento__content">${evento.title}</div>
                
            </div>`
        ).join("");
        
        contenedor.innerHTML += `
        <div class="semana__dia">
            <h5 class="${esHoy ? "hoy" : ""}">${fechaCorta.slice(-2)}</h5>
        <div class="eventos_semana">${eventosHTML}</div>
        </div>`;
        
        
    })
    
}

export function tareasPorDiaSemana(contenedor, fecha, eventos, svg){
    contenedor.innerHTML = "";
    const $totalTareasCompletadas = document.querySelector(".completadas__grafica")
    const $totalTareasSinCompletar = document.querySelector(".sinCompletar__grafica")
    const $promedioProductividadSpan = document.querySelector(".porcentaje__grafica-span")
    const $promedioDeTareasCompletadasPorDia = document.querySelector(".desempEstadistica__tres-grafica")

    // array para los dias de la semana
    let diasSemana = []
    // variables para el mes y año 
    let anio = fecha.getFullYear()
    let mes = fecha.getMonth()
    
    // determinacion de fechas
    let diaCorrespondienteEnLaSemana = fecha.getDay()
    let domingo = fecha.getDate() - diaCorrespondienteEnLaSemana
    // const maxTareas = 10;

    // creacion de array con los 7 dias de la semana
    for(let i=0; i < 7; i++){
        // let fechaPorDia = new Date(anio, mes, domingo + i).toISOString()
        let fechaPorDia = new Date(anio, mes, domingo + i)
        diasSemana.push(fechaPorDia)
    }

    // determinar el numero de tareas completadas por dia
    let resumenTareasPorDia = [];
    diasSemana.forEach(dia=>{
        const fechaCorta = new Date(dia).toISOString().split("T")[0];
        const eventosDelDia = eventos.filter((evento) => {
            if(!evento.deadline) return false;
            const eventoFecha = new Date(evento.deadline).toLocaleDateString("sv-SE"); // "2025-05-01"
            return eventoFecha === fechaCorta;
        }
        );     
        const completadasPorDia = eventosDelDia.filter(dia => dia.complete === 1).length; 
        const sinCompletadarPorDia = eventosDelDia.filter(dia => dia.complete === 0).length; 
        resumenTareasPorDia.push({
            fecha: fechaCorta,
            completadas:completadasPorDia ,
            incompletas: sinCompletadarPorDia,
            totalTareas: (completadasPorDia + sinCompletadarPorDia)
        });

    })
    let maxTareas = Math.max(...resumenTareasPorDia.map(dia => dia.totalTareas))
    
    let totalTareasCompletadas = []
    let totalTareasSinCompletadar = []
    resumenTareasPorDia.forEach((elemento)=>{
        if(elemento.completadas > 0){
            totalTareasCompletadas.push(elemento.completadas)
        }
        if(elemento.incompletas > 0){
            totalTareasSinCompletadar.push(elemento.incompletas)
        }
    })
    
    let totalDeDiasConTareasCompletadas = totalTareasCompletadas.length
    totalTareasCompletadas = totalTareasCompletadas.reduce((acumulador, actual) => acumulador + actual, 0)
    totalTareasSinCompletadar = totalTareasSinCompletadar.reduce((acumulador, actual) => acumulador + actual, 0)
    // tareas completadas
    if(totalTareasCompletadas === 0){
        $totalTareasCompletadas.textContent = "0"
    }else{

        $totalTareasCompletadas.textContent = totalTareasCompletadas 
    }
    // tareas sin completadar
    if(totalTareasSinCompletadar === 0){
        $totalTareasSinCompletar.textContent = "0"
    }else{

        $totalTareasSinCompletar.textContent = totalTareasSinCompletadar 
    }

    // Total de tareas en la semana 
    let totalTareasEnLaSemana = totalTareasCompletadas + totalTareasSinCompletadar

    // promedio de tareas completadas por dia 
    let porcentajeProductividad = totalTareasEnLaSemana > 0 
    ? ((totalTareasCompletadas / totalTareasEnLaSemana) * 100).toFixed(1) 
    : 0;
    $promedioProductividadSpan.textContent = `${porcentajeProductividad}%`
    
    // Porcentaje de productividad 
    let promedio = totalDeDiasConTareasCompletadas > 0 ? (totalTareasCompletadas / totalDeDiasConTareasCompletadas).toFixed(1) : 0;
    $promedioDeTareasCompletadasPorDia.textContent =  `${promedio}`

    // grafica de productividad
    graficaProductividad(svg, {totalTareasEnLaSemana, totalTareasCompletadas})

    diasSemana.forEach(dia=>{
        const fechaCorta = new Date(dia).toISOString().split("T")[0];

        const eventosDelDia = eventos.filter((evento) => {
            if(!evento.deadline) return false;
            const eventoFecha = new Date(evento.deadline).toLocaleDateString("sv-SE"); // "2025-05-01"
            return eventoFecha === fechaCorta;
        }
        );
        let cantidadDeTareas = eventosDelDia.length;
        let altura = Math.min((cantidadDeTareas / maxTareas) * 100, 100); // porcentaje

        contenedor.innerHTML += `
        <div class="tareasPorDiaContenedor">
            <div class="CantidadTareas">${cantidadDeTareas}</div>
                <div class="contenedor-barra">
                    <div class="barra-tarea" style="height: ${altura}%"></div>
                </div>
            <h5>${fechaCorta.slice(-2)}</h5>
        </div>`;
        
        
    })
    
}

export function tareasPorDiaDelMes(contenedor, fecha, eventos, svg) {
  contenedor.innerHTML = "";
  const $completadas = document.querySelector(".completadas__grafica-mes");
  const $sinCompletar = document.querySelector(".sinCompletar__grafica-mes");
  const $promedioMes = document.querySelector(".promedio__grafica-mes");
  const $porcentaje = document.querySelector(".porcentaje__grafica-span-mes");

  const anio = fecha.getFullYear();
  const mes = fecha.getMonth();

  let diasEnElMes = new Date(anio, mes + 1, 0).getDate();
  let resumen = [];

  for (let i = 1; i <= diasEnElMes; i++) {
    let diaActual = new Date(anio, mes, i).toISOString().split("T")[0];

    const eventosDelDia = eventos.filter(e => {
      if (!e.deadline) return false;
      let fechaEvento = new Date(e.deadline).toISOString().split("T")[0];
      return fechaEvento === diaActual;
    });

    const completadas = eventosDelDia.filter(e => e.complete === 1).length;
    const incompletas = eventosDelDia.filter(e => e.complete === 0).length;

    resumen.push({
      dia: i,
      completadas,
      incompletas,
      total: completadas + incompletas
    });
  }

  let totalComp = resumen.reduce((acc, dia) => acc + dia.completadas, 0);
  let totalIncomp = resumen.reduce((acc, dia) => acc + dia.incompletas, 0);
  let total = totalComp + totalIncomp;
  let diasConTareas = resumen.filter(d => d.total > 0).length;

  $completadas.textContent = totalComp;
  $sinCompletar.textContent = totalIncomp;
  $porcentaje.textContent = total > 0 ? `${((totalComp / total) * 100).toFixed(1)}%` : "0%";
  $promedioMes.textContent = diasConTareas > 0 ? (totalComp / diasConTareas).toFixed(1) : "0";

  let max = Math.max(...resumen.map(d => d.total), 1);

  resumen.forEach(d => {
    let altura = (d.total / max) * 100;
    contenedor.innerHTML += `
      <div class="tareasPorDiaContenedor">
        <div class="CantidadTareas">${d.total}</div>
        <div class="contenedor-barra">
          <div class="barra-tarea" style="height: ${altura}%"></div>
        </div>
        <h5>${d.dia}</h5>
      </div>
    `;
  });

  graficaProductividad(svg, { totalTareasEnLaSemana: total, totalTareasCompletadas: totalComp });
}

