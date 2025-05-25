import checkbox from "./exports/checkbox.js"
import allocation from "./exports/allocation.js"
import circleProgress from "./exports/circleProgress.js"
// import aUser from "../ajax/aUser.js"
import aTask from "../ajax/aTask.js"
import {formateoDeTitulo, diaAnterior, diaSiguiente} from './exports/funciones.js';


export async function initVistaDia() {
    const d = document
    const $form = d.querySelector(".task-form")
    const welcomeUser = d.querySelector(".title-main")
    const $contenedorDiaActual = d.querySelector(".diaActual")
    const $diaAnterior = d.querySelector(".diaAnterior")
    const $diaSiguiente = d.querySelector(".diaSiguiente")
    // package task ↓
    const panelTask = d.querySelector(".task-form")
    const $taskList = d.querySelector(".task-list")
    const $taskContainer = d.querySelector(".task-container")
    const $template = d.querySelector("template").content
    const $fragment = d.createDocumentFragment()
    const $circle = d.getElementById("progress-circle")
    const $tCompleted = d.querySelector(".task-completed")
    const $tTotal = d.querySelector(".task-total")

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

    aTask.getAll(FECHA,{
        $taskList,
        $taskContainer,
        $template,
        $fragment
    })

    // Si se le da click en el dia anterior
    $diaAnterior.addEventListener("click", (e)=>{
        FECHA = diaAnterior(FECHA)

        $contenedorDiaActual.textContent = FECHA.toLocaleString("co-CO", {
            weekday:"long",
            day: "2-digit",
            month: "long",
            year:"numeric"
        })
        // aTask.viewCalendarMonth(FECHA, $calendario)
        aTask.getAll(FECHA,{
            $taskList,
            $taskContainer,
            $template,
            $fragment
        })

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
        // aTask.viewCalendarMonth(FECHA, $calendario)
        aTask.getAll(FECHA,{
            $taskList,
            $taskContainer,
            $template,
            $fragment
        })

    })

    checkbox()  // permite que al dar click en el checkbox de la tarea el estado permanezca visible
    allocation($form)

    // Bienvenida con nombre de usuario
    aTask.usernameTitle(welcomeUser)

    // Grafica de progreso
    // let progress = await aTask.progressTasks()
    // circleProgress($circle, $tCompleted, $tTotal,progress)


    // metodo AJAX
    // metodo PATCH para editar una sola propiedad en una tarea
    $taskList.addEventListener("change", async (e)=>{
        if (e.target.matches(".checkbox")) {
            let taskChecked = e.target.closest(".task-container").querySelector(".task")
            let idTask = e.target.dataset.id;
            let statusChecked = e.target.checked
            
            await aTask.editChecked(idTask, statusChecked)
            await aTask.getAll(FECHA,{
                $taskList,
                $taskContainer,
                $template,
                $fragment
            })
            return
        }
        if (e.target.matches(".subtask-checkbox")) {
            let subtaskChecked = e.target.closest(".subtask-elements").querySelector(".subtask-item")
            let idSubtask = e.target.id.replace("s-", "");
            let statusChecked = e.target.checked
            await aTask.completeSubtaskChecked(subtaskChecked, idSubtask, statusChecked)
            return
        }
    })

    // Bienvenida con nombre de usuario
    aTask.usernameTitle(welcomeUser)
    
    // funcion para renderizar la vista desde index
    //evento "tareasActualizadas"
    d.addEventListener("tareasActualizadas", async () => {
        console.log("La vista día se actualiza...");
        await aTask.getAll(FECHA, { $taskList, $taskContainer, $template, $fragment });
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
