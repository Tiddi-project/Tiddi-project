import aTask from "../ajax/aTask.js"
import allocation from "./exports/allocation.js"
import checkbox from "./exports/checkbox.js"
import panelActive from "./exports/panel.js"
import conexion from "./exports/conexion.js"
import aUser from "../ajax/aUser.js"
import { checkAuth } from "../ajax/auth.js"
import circleProgress from "./exports/circleProgress.js"


const d = document
const panelTask = d.querySelector(".task-form")
const $form = d.querySelector(".task-form")
// package task ↓
const $taskList = d.querySelector(".task-list")
const $taskContainer = d.querySelector(".task-container")
const $template = d.querySelector("template").content
const $fragment = d.createDocumentFragment()
const $circle = d.getElementById("progress-circle")
const $tCompleted = d.querySelector(".task-completed")
const $tTotal = d.querySelector(".task-total")


d.addEventListener("DOMContentLoaded",async (e)=>{
    const user = await checkAuth(); // Espera a que la autenticación termine antes de continuar
    if (!user) {
        window.location.href = "http://localhost:3000/inicio-sesion.html"; // Redirige si no está autenticado
        return;
    }

    panelActive(panelTask)
    checkbox()
    allocation($form)
    conexion()
    let progress = await aTask.progressTasks()
    console.log(progress.complete);
    console.log(progress.totalTask);
    circleProgress($circle, $tCompleted, $tTotal,progress)
    
    // metodo AJAX
    // metodo get para poder visualizar las tareas en la pag
    aTask.getAll({
        $taskList,
        $taskContainer,
        $template,
        $fragment
    })
    
    // Metodos de insercion de datos
    $form.addEventListener("submit", (e)=>{
        e.preventDefault()

        if($form.id.value === ""){
            // metodo POST para agregar una tareas
            aTask.addTask($form)
        }else{
            // metodo PUT para editar una tarea
            aTask.editTask($form)
        }

        window.location.reload()
    })

    // metodo PATCH para editar una sola propiedad en una tarea
    d.addEventListener("change", (e)=>{
        let taskChecked = e.target.closest(".task-container").querySelector(".task")
        let idTask = e.target.dataset.id;
        let statusChecked = e.target.checked
        
        aTask.editChecked(taskChecked, idTask, statusChecked)
    })
    
    // metodo DELETE para eliminar una tarea
    d.addEventListener("click", (e)=>{
        // console.log(e.target.dataset.id);
        if(e.target.matches("#delete")){
            let isConfirmed = confirm("¿Estas seguro de que deseas eliminar la tarea?")
            if(isConfirmed){
                aTask.deleteTask($form)
                window.location.reload()
            }else{
                e.preventDefault()
            }
        }

        if(e.target.matches(".logout")){
            console.log(e.target.matches(".logout"));
            aUser.logoutUser()
        }
    })



})
