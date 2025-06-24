import { checkAuth } from "../ajax/auth.js"
import aTask from "../ajax/aTask.js"
import aUser from "../ajax/aUser.js"
import subtask from "./exports/subtarea.js"
import panelActive from "./exports/panel.js"
import conexion from "./exports/conexion.js"
import aView from "../ajax/aViews.js"
import { aReminder } from "../ajax/aReminder.js"
import validarTareas from "./exports/validacionTareas.js"

const d = document
const $logout = d.getElementById("logout")
const $vistaAdmin = d.getElementById("li__admin")

/*---- Variables para el panel de tareas ----*/
const panelTask = d.querySelector(".task-form")
const $form = d.querySelector(".task-form")
const $button = d.querySelector(".btn-task-sider")
const $imagenInput = d.getElementById("imagen")
const $imagenbtn = d.querySelector(".img-btn")
const $imagenInsertada = d.querySelector(".imagen-insertada")
const $btnEliminarImagen = d.querySelector(".btn-eliminar-imagen")
const $mensajeAdvertencia = d.querySelector(".testTaskImageFail")

/* --------sliderbar------------ */
const logo = d.getElementById("logoT")
const logoLetras = d.querySelector(".logo-letras")
const botonNuevaTarea = d.querySelector(".btn-task-sider")
const slidebar = d.querySelector(".slidebar")
const slidebarBtn = d.querySelector(".menu-btn")
const spans = d.querySelectorAll(".span")
const $fotoDePerfil = d.querySelector(".fotoDePerfil")
const nombreDeUsuarioSidebar = d.querySelector(".nombreUsuarioSidebar")

/*------------subtareas------------------ */ 
const $subtaskContainer = d.querySelector(".subtask__container")
const $subtaskButton = d.querySelector(".subtask-button")

/*------------vistas------------------ */ 
const $mainContent = d.querySelector(".main-content")
const $enlacesVistas = d.querySelectorAll(".nav-item a")
const $contenedorDinamico = d.getElementById("main-content")
const $toastReminder = d.querySelector(".toast__reminder")

// package task ↓
let vistaActual
/*
const $template = d.querySelector("template").content
const $fragment = d.createDocumentFragment()
const $circle = d.getElementById("progress-circle")
const $tCompleted = d.querySelector(".task-completed")
const $tTotal = d.querySelector(".task-total")
*/



d.addEventListener("DOMContentLoaded",async (e)=>{

    // Envia los datos de usuario para mantener la sesion iniciada
    const user = await checkAuth(); // Espera a que la autenticación termine antes de continuar
    if (!user) {
        window.location.href = "http://localhost:3000/inicio-sesion.html"; 
        return;
    }
    if(user.role === "admin"){
        $vistaAdmin.style.display = "flex"
    }else{
        $vistaAdmin.style.display = "none"
    }

    // Funcion para identificar si el usuario se queda sin conexion internet
    conexion()
    
    //  Asignacion de la foto de perfil
    $fotoDePerfil.src = user.profile_picture || '../assets/foto-de-perfil.png';

    // cargar la vista del día automáticamente:
    await aView($contenedorDinamico, "vistas/vistaDia.html");
    vistaActual = "vistas/vistaDia.html";
    const enlaceInicial = d.querySelector('.nav-item a[data-vista="vistas/vistaDia.html"]');
    if (enlaceInicial) {
        enlaceInicial.classList.add("active");
    }
    
    // recordatorios
    aReminder($toastReminder)

    // Bienvenida con nombre de usuario
    await aTask.welcomeUser({ nombreDeUsuarioSidebar})

    /*   ------------------------------------------------------------- Funciones para el manejo de sidebar*/
    function close(){
        slidebar.classList.add("slidebar-mini")
        slidebarBtn.classList.add("btn-task-mini")
        logoLetras.classList.add("ocultar")
        botonNuevaTarea.classList.add("ocultar")
        spans.forEach((span)=>{
            span.classList.add("ocult")
            span.classList.add("span-hover")
        })
        $mainContent.classList.add("main-content-reduce")
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
        $mainContent.classList.remove("main-content-reduce")
        localStorage.setItem("sidebar","open")
    }
    if(localStorage.getItem("sidebar") === null) localStorage.setItem("sidebar","open")
    if(localStorage.getItem("sidebar") === "open") open()
    if(localStorage.getItem("sidebar") === "close") close()

    slidebarBtn.addEventListener("click", (e)=>{
        if (localStorage.getItem("sidebar") === "open") {
            close();
        } else {
            open();
        } 
    })

    /*--------------------------------------------------------------------------Foto de perfil en sidebar*/
    $fotoDePerfil.addEventListener("click", (e)=>{
            const menu = document.getElementById("perfilMenu");
            const perfil = document.getElementById("perfil")
            menu.classList.toggle("active");
            perfil.classList.toggle("active");
        }
    )

    /*----------------------------------------------------------------------------------Cierre de sesion */
    $logout.addEventListener("click", async()=>{
        await aUser.logoutUser()
    })

    /*--------------------------------------------------------------------------Manejo de panel de tareas */
    // permite que aparezca y desaparezca el panel de tareas mediante click
    panelActive(panelTask, $button) 

    // agregar subtareas en el panel de tareas
    $subtaskButton.addEventListener("click", (e)=>{
        subtask($subtaskContainer)
    });

    // Permite la eliminacion de una subtarea
    d.addEventListener("click", (e)=>{
        
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
        

    })

    // Manejo de imagenes en panel de tarea
    $imagenbtn.addEventListener("click", (e)=>{
        $imagenInput.click()
    })
    $imagenInput.addEventListener("change", (e)=>{
        const file = e.target.files[0]

        if (!file) return; // Si no hay archivo, no hagas nada

         // Validación de tipo de archivo
        if (!file.type.startsWith("image/")) {
            // Por favor selecciona un archivo de imagen válido.
            $mensajeAdvertencia.textContent = "Por favor selecciona un archivo de imagen válido."
            $mensajeAdvertencia.style.display = "block"
            return;
        }else{
            $mensajeAdvertencia.style.display = "none"
            // $nombreImagen.textContent = file.name
        }

        // Validación de tamaño máximo 2MB
        const MAX_SIZE_MB = 2;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            $mensajeAdvertencia.textContent = `La imagen debe pesar menos de ${MAX_SIZE_MB}MB.`
            $mensajeAdvertencia.style.display = "block"
            return;
        }else{
            $mensajeAdvertencia.style.display = "none"
            // $nombreImagen.textContent = file.name
        }
        const reader =  new FileReader()


        reader.onload = ()=>{
            $imagenInsertada.src = reader.result
            $imagenInsertada.style.display = "block"
            $btnEliminarImagen.style.display = "block"
        }

        reader.readAsDataURL(file)
    })
    $btnEliminarImagen.addEventListener("click", (e)=>{
        $imagenInput.value = "";
        $imagenInsertada.src = "";
        $imagenInsertada.style.display = "none";
        $btnEliminarImagen.style.display = "none"
    })
    
    /*-----------------------------------------------------------------------------------Carga de vistas */
    // let vistaActual = null; 
    // $enlacesVistas.forEach((enlace)=>{
    //     enlace.addEventListener("click",async (e)=>{
    //         const enlaceReal = e.target.closest("a"); // <-- siempre busca el <a>
    //         const vista = enlaceReal?.dataset.vista;
    //         $enlacesVistas.forEach(el => el.classList.remove("active"));
    //         enlaceReal.classList.add("active");
    //         await aView( $contenedorDinamico, vista)
    //         vistaActual = vista
    //     })
    // })
    // let vistaActual = "vistas/vistaDia.html"; // variable para guardar la vista activa

    function setupListeners() {
        $enlacesVistas.forEach((enlace) => {
            enlace.addEventListener("click", async (e) => {
                const enlaceReal = e.target.closest("a"); 
                const vista = enlaceReal?.dataset.vista;
                if (!vista) return;
                
                $enlacesVistas.forEach(el => el.classList.remove("active"));
                enlaceReal.classList.add("active");

                await aView($contenedorDinamico, vista);
                vistaActual = vista; // Actualiza la variable global
            });
        });
    }

    /*-----------------------------------------------------------------Funcionalidad de tareas */
    let validacionDeTareas = validarTareas($form)
    // crear y editar tareas
    $form.addEventListener("submit", async (e)=>{
        e.preventDefault()
        if(validacionDeTareas){
            if($form.id.value === ""){
                // metodo POST para agregar una tareas
                await aTask.addTask($form) 
                aReminder($toastReminder);
                // Luego de crear/editar/eliminar la tarea:
                d.dispatchEvent(new CustomEvent("tareasActualizadas"));
     
                panelTask.classList.remove("isActive")
                $form.reset()     
            }
            else{
                // metodo PUT para editar una tarea
                await aTask.editTask($form)
                aReminder($toastReminder);
                d.dispatchEvent(new CustomEvent("tareasActualizadas"));
                panelTask.classList.remove("isActive")
                $form.reset()     
    
            }
        }else{
            return
        }
    })
    // eliminar tareas
    d.addEventListener("click",async (e)=>{
        if(e.target.matches("#delete")){
            $form.querySelector(".modalEliminacion").style.display = "flex"
        }
        if(e.target.matches("#eliminacionAceptar")){
            await aTask.deleteTask($form)
            
            console.log("eliminacion actualizada");
            panelTask.classList.remove("isActive")  
            $form.querySelector(".modalEliminacion").style.display = "none"
            $form.reset()     

            // Se activa la recarga de la vsta
            d.dispatchEvent(new CustomEvent("tareasActualizadas"));
        }else if(e.target.matches("#eliminacionCancelar")){
            $form.querySelector(".modalEliminacion").style.display = "none"
            e.preventDefault()
        }
        /*
        console.log("se activa la eliminacion");
        let isConfirmed = confirm("¿Estas seguro de que deseas eliminar la tarea?")
        if(isConfirmed){
            // Se activa el ajax
            await aTask.deleteTask($form)

            
            console.log("eliminacion actualizada");
            panelTask.classList.remove("isActive")     
            $form.reset()     

            // Se activa la recarga de la vsta
            d.dispatchEvent(new CustomEvent("tareasActualizadas"));
            
        }else{
            e.preventDefault()
        }
        */
    })
    // Funciona para el renderizado de las vistas
    d.addEventListener("tareasActualizadas", async () => {
        if (vistaActual) {
            await aView($contenedorDinamico, vistaActual);
            console.log("Recargada vista actual:", vistaActual);
        } else {
            console.log("vistaActual es null al actualizar tareas",vistaActual );
        }
    });
    setupListeners();

})    
 

    
    

