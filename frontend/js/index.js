import { checkAuth } from "../ajax/auth.js"
import aTask from "../ajax/aTask.js"
import aUser from "../ajax/aUser.js"
import subtask from "./exports/subtarea.js"
import checkbox from "./exports/checkbox.js"
import allocation from "./exports/allocation.js"
import panelActive from "./exports/panel.js"
import circleProgress from "./exports/circleProgress.js"
import conexion from "./exports/conexion.js"

const d = document
const panelTask = d.querySelector(".task-form")
const $form = d.querySelector(".task-form")
const $button = d.querySelector(".btn-task-sider")
const $logout = d.getElementById("logout")
const welcomeUser = d.querySelector(".title-main")
const nameUser = d.querySelector(".nombre")
const emailUser = d.querySelector(".email")
// package task ↓
const $taskList = d.querySelector(".task-list")
const $taskContainer = d.querySelector(".task-container")
const $template = d.querySelector("template").content
const $fragment = d.createDocumentFragment()
const $circle = d.getElementById("progress-circle")
const $tCompleted = d.querySelector(".task-completed")
const $tTotal = d.querySelector(".task-total")
/* --------sliderbar------------ */
const logo = d.getElementById("logoT")
const logoLetras = d.querySelector(".logo-letras")
const botonNuevaTarea = d.querySelector(".btn-task-sider")
const slidebar = d.querySelector(".slidebar")
const slidebarBtn = d.querySelector(".menu-btn")
const spans = d.querySelectorAll(".span")
/*------------subtareas------------------ */ 
const $subtaskContainer = d.querySelector(".subtask__container")
const $subtaskElement = d.querySelector(".subtask-elements")
const $subtaskButton = d.querySelector(".subtask-button")
const $removeSubtask = d.querySelector(".remove-subtask")
const $tasks = d.querySelectorAll(".task")

d.addEventListener("DOMContentLoaded",async (e)=>{
    // Envia los datos de usuario para mantener la sesion iniciada
    const user = await checkAuth(); // Espera a que la autenticación termine antes de continuar
    if (!user) {
        window.location.href = "http://localhost:3000/inicio-sesion.html"; 
        return;
    }

    panelActive(panelTask, $button)
    checkbox()
    allocation($form)
    conexion()

    // agregar subtareas 
    $subtaskButton.addEventListener("click", (e)=>{
        subtask($subtaskContainer)
    });

    // Grafica de progreso
    let progress = await aTask.progressTasks()
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
    $taskList.addEventListener("change", (e)=>{
        //console.log(e.target); //subtask-checkbox
        if (e.target.matches(".checkbox")) {
            let taskChecked = e.target.closest(".task-container").querySelector(".task")
            let idTask = e.target.dataset.id;
            let statusChecked = e.target.checked
            
            aTask.editChecked(taskChecked, idTask, statusChecked)
            return
        }
        if (e.target.matches(".subtask-checkbox")) {
            let subtaskChecked = e.target.closest(".subtask-elements").querySelector(".subtask-item")
            let idSubtask = e.target.id.replace("s-", "");
            let statusChecked = e.target.checked
            // console.log(statusChecked);
            
             aTask.completeSubtaskChecked(subtaskChecked, idSubtask, statusChecked)
             return
        }
    })
    
    // metodo DELETE para eliminar una tarea
    d.addEventListener("click", (e)=>{
        if(e.target.matches("#delete")){
            let isConfirmed = confirm("¿Estas seguro de que deseas eliminar la tarea?")
            if(isConfirmed){
                aTask.deleteTask($form)
                window.location.reload()
            }else{
                e.preventDefault()
            }
        }
        
        // Eliminacion de subtareas
        if(e.target.classList.contains("remove-subtask")){
            e.target.parentElement.remove()
        }

        // subtareas
        let taskElement = e.target.closest(".task"); // Asegura que el click venga de `.task`
        if (taskElement) {
            let subtaskContainer = taskElement.closest(".task-container")?.querySelector(".subtask-elements");
            
            if (subtaskContainer) {
                subtaskContainer.classList.toggle("subtask-active");
            }
        }
        console.log(e.target.matches(".fotoDePerfil"))
        console.log(e.target.matches("#perfil"))

        if (e.target.matches(".fotoDePerfil")) {
            const menu = document.getElementById("perfilMenu");
            const perfil = document.getElementById("perfil")
            menu.classList.toggle("active");
            perfil.classList.toggle("active");
        }


    })
    // cierre de sesion
    $logout.addEventListener("click", ()=>{
        aUser.logoutUser()
    })

    // Bienvenida con nombre de usuario
    aTask.welcomeUser({welcomeUser, nameUser, emailUser})
    
    // funciones para el manejo de sidebar
    function close(){
        slidebar.classList.add("slidebar-mini")
        slidebarBtn.classList.add("btn-task-mini")
        logoLetras.classList.add("ocultar")
        botonNuevaTarea.classList.add("ocultar")
        spans.forEach((span)=>{
            span.classList.add("ocult")
            span.classList.add("span-hover")
        })
        localStorage.setItem("sidebar","close")
    }
    function open(){
        slidebar.classList.remove("slidebar-mini")
        slidebarBtn.classList.remove("btn-task-mini")
        logoLetras.classList.remove("ocultar")
        botonNuevaTarea.classList.remove("ocultar")
        spans.forEach((span)=>{
            span.classList.remove("ocult")
            span.classList.remove("span-hover")
        })
        localStorage.setItem("sidebar","open")
    }

    // localstorage para el manejo del sidebar
    if(localStorage.getItem("sidebar") === null) localStorage.setItem("sidebar","open")
    if(localStorage.getItem("sidebar") === "open") open()
    if(localStorage.getItem("sidebar") === "close") close()

    // Manejo de siderbar
    slidebarBtn.addEventListener("click", (e)=>{
        if (localStorage.getItem("sidebar") === "open") {
            close();
        } else {
            open();
        } 
    })
})