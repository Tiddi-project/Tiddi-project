import checkbox from "./exports/checkbox.js"
import allocation from "./exports/allocation.js"
import aTask from "../ajax/aTask.js"
import {diaAnterior, diaSiguiente} from './exports/funciones.js';
import { getAndRenderTasks } from "./exports/renderizadoTareas.js";


export async function initVistaDia() {
    const d = document
    const $form = d.querySelector(".task-form")
    const welcomeUser = d.querySelector(".title-main")
    const $contenedorDiaActual = d.querySelector(".diaActual")
    const $diaAnterior = d.querySelector(".diaAnterior")
    const $diaSiguiente = d.querySelector(".diaSiguiente")
    const $btnFiltro = d.querySelector(".filtros")
    const $filtroContenedor = d.querySelector(".filtros__contenedor")
    const $filtroPrioridad = d.getElementById("filtro__prioridad")
    const $filtroEstado = document.getElementById("filtro__estado");
    // package task ↓
    const $taskList = d.querySelector(".task-list")
    const $taskContainer = d.querySelector(".task-container")
    const $template = d.querySelector("template").content
    const $fragment = d.createDocumentFragment()

    // variables para el uso de fechas
    let FECHA = new Date()
    const contenidoFechaAMostrar = FECHA.toLocaleString("co-CO", {
        weekday:"long",
        day: "2-digit",
        month: "long",
        year:"numeric"
    })

    // Visualizacion de la fecha del dia
    $contenedorDiaActual.textContent = contenidoFechaAMostrar

    // 1. Recuperar filtros guardados (al cargar la página o cambiar de fecha)
    const prioridadGuardada = localStorage.getItem("filtroPrioridad") || "todos";
    const estadoGuardado = localStorage.getItem("filtroEstado") || "todos";

    // 2. Reflejar la selección en los filtros
    $filtroPrioridad.value = prioridadGuardada;
    $filtroEstado.value = estadoGuardado;
    await getAndRenderTasks(FECHA, {
        $taskList,
        $taskContainer,
        $template,
        $fragment
    }, prioridadGuardada, estadoGuardado)

    // Si se le da click en el dia anterior
    $diaAnterior.addEventListener("click", (e)=>{
        FECHA = diaAnterior(FECHA)

        $contenedorDiaActual.textContent = FECHA.toLocaleString("co-CO", {
            weekday:"long",
            day: "2-digit",
            month: "long",
            year:"numeric"
        })
        const prioridad = localStorage.getItem("filtroPrioridad") || "todos";
        const estado = localStorage.getItem("filtroEstado") || "todos";
        getAndRenderTasks(FECHA, {
            $taskList,
            $taskContainer,
            $template,
            $fragment
        }, prioridad, estado)

    })

    // Si se le da click en el dia siguiente
    $diaSiguiente.addEventListener("click", (e)=>{
        FECHA = diaSiguiente(FECHA)

        $contenedorDiaActual.textContent = FECHA.toLocaleString("co-CO", {
            weekday:"long",
            day: "2-digit",
            month: "long",
            year:"numeric"
        })
        
        const prioridad = localStorage.getItem("filtroPrioridad") || "todos";
        const estado = localStorage.getItem("filtroEstado") || "todos";
        getAndRenderTasks(FECHA, {
            $taskList,
            $taskContainer,
            $template,
            $fragment
        }, prioridad, estado)

    })

    checkbox()  // permite que al dar click en el checkbox de la tarea el estado permanezca visible
    allocation($form)

    // Bienvenida con nombre de usuario
    aTask.usernameTitle(welcomeUser)

    // metodo AJAX
    // metodo PATCH para editar una sola propiedad en una tarea
    $taskList.addEventListener("change", async (e)=>{
        if (e.target.matches(".checkbox")) {
            let taskChecked = e.target.closest(".task-container").querySelector(".task")
            let idTask = e.target.dataset.id;
            let statusChecked = e.target.checked
            
            await aTask.editChecked(idTask, statusChecked)
            // await aTask.getAll(FECHA,{
            //     $taskList,
            //     $taskContainer,
            //     $template,
            //     $fragment
            // })
            getAndRenderTasks(FECHA, {
                $taskList,
                $taskContainer,
                $template,
                $fragment
            }, prioridadGuardada, estadoGuardado)
            return
        }
        if (e.target.matches(".subtask-checkbox")) {
            let subtaskChecked = e.target.closest(".subtask-elements").querySelector(".subtask-item")
            let idSubtask = e.target.id.replace("s-", "");
            let statusChecked = e.target.checked
            
            await aTask.completeSubtaskChecked(subtaskChecked, idSubtask, statusChecked)
            getAndRenderTasks(FECHA, {
                $taskList,
                $taskContainer,
                $template,
                $fragment
            }, prioridadGuardada, estadoGuardado)
            return
        }
        getAndRenderTasks(FECHA, {
                $taskList,
                $taskContainer,
                $template,
                $fragment
            }, prioridadGuardada, estadoGuardado)
    })

    // Bienvenida con nombre de usuario
    await aTask.usernameTitle(welcomeUser)

    // Activacion de filtro
    $btnFiltro.addEventListener("click", (e)=>{
        $filtroContenedor.classList.toggle("filtroAtive")
    })
    // $filtroPrioridad.addEventListener("change", (e)=>{
    //     const prioridad = e.target.value
    //     console.log(prioridad);
    //     getAndRenderTasks(FECHA, {
    //         $taskList,
    //         $taskContainer,
    //         $template,
    //         $fragment
    //     }, prioridad)
        
    // })
    
    // funcion para renderizar la vista desde index
    //evento "tareasActualizadas"
    
    function aplicarFiltros() {
        const prioridad = $filtroPrioridad.value;
        const estado = $filtroEstado.value;
        // Guardar filtros
        localStorage.setItem("filtroPrioridad", prioridad);
        localStorage.setItem("filtroEstado", estado)

        console.log("Prioridad:", prioridad, "Estado:", estado);

        getAndRenderTasks(FECHA, {
            $taskList,
            $taskContainer,
            $template,
            $fragment
        }, prioridad, estado);
    }
    $filtroPrioridad.addEventListener("change", aplicarFiltros);
    $filtroEstado.addEventListener("change", aplicarFiltros);
    
    
    d.addEventListener("tareasActualizadas", async () => {
        console.log("La vista día se actualiza...");
        // await aTask.getAll(FECHA, { $taskList, $taskContainer, $template, $fragment });
        getAndRenderTasks(FECHA, {
            $taskList,
            $taskContainer,
            $template,
            $fragment
        }, prioridadGuardada, estadoGuardado)
    });
}



// $taskList.addEventListener("click", async (e) => {
//     if (e.target.matches(".checkbox")) {
//         let taskContainer = e.target.closest(".task-container");
//         let taskElement = taskContainer.querySelector(".task");
//         let idTask = e.target.dataset.id;
//         let statusChecked = e.target.checked;

//         // Actualiza clase visualmente
//         taskElement.classList.toggle("completed", statusChecked);

//         // Actualiza en backend
//         await aTask.editChecked(taskElement, idTask, statusChecked);

//         // Actualiza progreso
//         let progress = await aTask.progressTasks();
//         circleProgress($circle, $tCompleted, $tTotal, progress);
//     }

//     if (e.target.matches(".subtask-checkbox")) {
//         let subtaskItem = e.target.closest(".subtask-item");
//         let subtaskContent = subtaskItem.querySelector(".subtask-item-content");
//         let idSubtask = e.target.id.replace("s-", "");
//         let statusChecked = e.target.checked;

//         // Actualiza clase visualmente
//         subtaskContent.classList.toggle("completed", statusChecked);

//         // Actualiza en backend
//         await aTask.completeSubtaskChecked(subtaskItem, idSubtask, statusChecked);

//         // Opcional: si quieres que las subtareas también afecten al progreso
//         let progress = await aTask.progressTasks();
//         circleProgress($circle, $tCompleted, $tTotal, progress);
//     }
// });
