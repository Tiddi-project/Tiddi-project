import aTask from "../../ajax/aTask.js";
import circleProgress from "./circleProgress.js";

export async function getAndRenderTasks(fecha, opciones, prioridad="todos", estado="todos"){
    // Valores del ajax
    let resultadoAjax = await aTask.getAll()

    // Filtramos solo las tareas que coincidan con la fecha
    const fechaCorta  = fecha.toLocaleDateString("sv-SE");
    let tareasDelDia = resultadoAjax.filter(task => {
        if (!task.deadline) return false;
        let fechaTarea = new Date(task.deadline).toLocaleDateString("sv-SE");
        return fechaTarea === fechaCorta;
    });

    renderTasks(tareasDelDia, opciones, prioridad, estado)
    // Llamar a la función que actualiza el progreso visual
    circleProgress(tareasDelDia)

    
}

function renderTasks(tareasDelDia, option, filtroPrioridad, filtroEstado){


    // 🧼 Limpiar el contenedor antes de renderizar
    option.$taskList.innerHTML = "";

    // Restriccion en caso de no haber tareas relacionadas con el usuario
    if (tareasDelDia.length === 0) {
        option.$taskList.innerHTML = `<h2>No tienes tareas para este día</h2>`;
        return;
    }

    // Ordena por hora de la deadline (más temprano primero)
    tareasDelDia.sort((a, b) => {
        const timeA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const timeB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        return timeA - timeB;
    });

    if (filtroPrioridad !== "todos") {
        tareasDelDia = tareasDelDia.filter(task => {
            return task.priority?.toLowerCase() === filtroPrioridad;
        });
    }
    if (filtroEstado !== "todos") {
        tareasDelDia = tareasDelDia.filter(task => {
            if (filtroEstado === "enProceso") return task.complete === 0;
            if (filtroEstado === "completados") return task.complete === 1;
        });
    }
    // console.log(tareasDelDia);
    tareasDelDia.forEach((task, index) => {
        // console.log(task);
        // tareasMap[task.task_id] = task;
        // creamos un clone de template
        let clone = document.importNode(option.$template, true)
        // se le asigna el color al contenedorcolor del contenedor
        const taskContainer = clone.querySelector(".task-container");
        if (task.color) {
            // Asegura que el color tenga el formato correcto (con #)
            const colorHex = task.color.startsWith("#") ? task.color : `#${task.color}`;
            taskContainer.style.backgroundColor = colorHex;
        }

        // checkbox
        clone.querySelector(".checkbox").dataset.id = task.task_id
        clone.querySelector(".checkbox").setAttribute("id", index)
        clone.querySelector(".newCheckbox").setAttribute("for", index)
        clone.querySelector(".task").setAttribute("for", index)
        
        if(task.complete === 1){
            clone.querySelector(".task").classList.add("completed")
            clone.querySelector(".checkbox").checked = true
        }else{
            clone.querySelector(".task").classList.remove("completed")
            clone.querySelector(".checkbox").checked = false
        }

        // insertando valores de la API en contenedor de tarea
        clone.querySelector(".title").textContent = task.title
        let fechaTarea = new Date(task.deadline)
        let horaTarea = fechaTarea.getHours()
        let minTarea = String(fechaTarea.getMinutes()).padStart(2, "0")
        // console.log(`${horaTarea}:${minTarea}`);
        clone.querySelector(".horaTarea").textContent = `${horaTarea}:${minTarea}`

        // Color de la prioridad
        if(task.priority === "baja"){
            clone.querySelector(".color-priority").style.backgroundColor = "rgb(110, 239, 227)"
        }else if(task.priority === "media"){
            clone.querySelector(".color-priority").style.backgroundColor = "rgb(255, 195, 0)"
        }else if(task.priority === "alta"){
            clone.querySelector(".color-priority").style.backgroundColor = "rgb(255, 55, 55)"
        }
        
        // subtask
        let subtaskList = clone.querySelector(".subtask-list");
        subtaskList.innerHTML = ""; // 🔹 Evita la duplicación de subtareas

        if(task.subtasks?.length === 1 && task.subtasks[0]?.id === null){
            subtaskList.innerHTML = `<p class="no-subtasks">No hay subtareas</p>`; // 🔹 Mensaje si no hay subtareas
        }else if(task.subtasks.length > 0){
            task.subtasks.forEach((subtask)=>{
                let liElement = document.createElement("li")
                liElement.classList.add("subtask-item")
                liElement.dataset.id = subtask.id
                liElement.innerHTML = `
                <input type="checkbox" id="s-${subtask.id}" name="subtaskCheckbox" class="subtask-checkbox">
                <label for="s-${subtask.id}" class="subtask-checkbox-label"></label>
                <span class="subtask-item-content">${subtask.title}</span>
                `;
                if(subtask.complete === 1){
                    liElement.querySelector(".subtask-item-content").classList.add("completed");
                    liElement.querySelector(".subtask-checkbox").checked = true;
                }
                subtaskList.appendChild(liElement)      
            })
        }else {
            subtaskList.innerHTML = `<p class="no-subtasks">No hay subtareas</p>`; // 🔹 Mensaje si no hay subtareas
        }
        /*
        const fechaISO = task.deadline;
        const fecha = new Date(fechaISO);
        // Formato correcto para input type="datetime-local"
        const fechaFormateada = fecha.toISOString().slice(0, 16);
        // Opción alternativa que ajusta a zona local automáticamente:
        const fechaLocal = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
        */
        // formateando la hora de la base de datos a la aceptada por el input
        function toLocalDatetimeInputValue(utcString) {
            const utcDate = new Date(utcString);
            const tzOffset = utcDate.getTimezoneOffset() * 60000;
            const localDate = new Date(utcDate.getTime() - tzOffset);
            return localDate.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
            }
        // insertando data-attribute
        clone.querySelector(".edit").dataset.id = task.task_id
        clone.querySelector(".edit").dataset.title = task.title
        clone.querySelector(".edit").dataset.description = task.description
        clone.querySelector(".edit").dataset.priority = task.priority
        // clone.querySelector(".edit").dataset.deadline = fechaFormateada
        clone.querySelector(".edit").dataset.deadline = toLocalDatetimeInputValue(task.deadline)
        clone.querySelector(".edit").dataset.colorTarea = task.color
        clone.querySelector(".edit").dataset.reminder = task.reminder_min || 0

        const subtasksValidas = Array.isArray(task.subtasks)
        ? task.subtasks.filter(st => st.id !== null && st.title?.trim() !== ""): [];
        clone.querySelector(".edit").dataset.subtask = JSON.stringify(subtasksValidas)

        clone.querySelector(".edit").dataset.imagen = (
            task.imagen_url && task.imagen_url !== "null" && task.imagen_url !== "undefined"
        ) ? task.imagen_url : "";
        
        // clone.querySelector(".edit").dataset.subtask = JSON.stringify(task.subtasks)
        // clone.querySelector(".edit").dataset.imagen = task.imagen_url
        // uniendo el formato
        
        option.$fragment.appendChild(clone)
    });

    // console.log(tareasMap);

    option.$taskList.appendChild(option.$fragment)

}