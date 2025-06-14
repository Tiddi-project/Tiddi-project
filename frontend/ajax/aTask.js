import { calendario, calendarioPorSemana, tareasPorDiaSemana } from "../js/exports/calendario.js";
import circleProgress from "../js/exports/circleProgress.js";

const aTask = {
    getAll: async (fecha, option)=>{
        try {
            // Peticion
            let res = await fetch("http://localhost:3000/tasks",{
                method: "GET",
                credentials: "include"
            })

            // convertir datos del backend en formato que se usa en js
            let data = await res.json()
            if(!res.ok){
                throw {status: res.status, message: res.statusText, dir:res}
            }

            return data

            /*
            // Filtramos solo las tareas que coincidan con la fecha
            const fechaCorta  = fecha.toLocaleDateString("sv-SE");
            let tareasDelDia = data.filter(task => {
                if (!task.deadline) return false;
                let fechaTarea = new Date(task.deadline).toLocaleDateString("sv-SE");
                return fechaTarea === fechaCorta;
            });
            

            // 🧼 Limpiar el contenedor antes de renderizar
            option.$taskList.innerHTML = "";

            let tareasCompletadas = tareasDelDia.filter(tarea => {
                return tarea.complete === 1 
            }).length
            circleProgress(tareasCompletadas, tareasDelDia.length)


            // Restriccion en caso de no haber tareas relacionadas con el usuario
            if (tareasDelDia.length === 0) {
                option.$taskList.innerHTML = `<h2>No tienes tareas para este día</h2>`;
                return;
            }
            
            tareasDelDia.forEach((task, index) => {
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
                clone.querySelector(".description").textContent = task.description

                
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
                clone.querySelector(".edit").dataset.deadline = toLocalDatetimeInputValue(task.deadline)
                clone.querySelector(".edit").dataset.colorTarea = task.color
                clone.querySelector(".edit").dataset.imagen = task.imagen_url
                clone.querySelector(".edit").dataset.reminder = task.reminder_min || 0
                clone.querySelector(".edit").dataset.subtask = JSON.stringify(task.subtasks)

                // uniendo el formato
                
                option.$fragment.appendChild(clone)
            });

            option.$taskList.appendChild(option.$fragment)

            */

        } catch (error) {
            let message = error.statusText || "Se ha producido un error"
            let status = error.status || "404"
            option.$taskList.innerHTML = 
            `<h3>Error ${status}: ${message} </h3>
            <br>
            <p> No se encontro el contenido solicitado  </p>
            `
        }
    },
    addTask: async (form)=>{
        try {
            // Se asignan las subtareas en un arreglo para enviar la totalidad de ellas
            let subtasks = [];
            document.querySelectorAll(".subtask-input").forEach(input => {
                if (input.value.trim() !== "") {
                    subtasks.push({ title: input.value, complete: false });
                }
            });

            /* // Peticion al servidor sin incluir imagenes 
            let res = await fetch("http://localhost:3000/task", {
                method: "POST",
                credentials: "include",
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({
                    title: form.titleTask.value,
                    description: form.descriptionTask.value,
                    deadline: form.fechaHora.value,
                    priority: form.priority.value,
                    completed: false,
                    color: form.colorTarea.value,
                    subtasks
                })
            })
            */

            let formData = new FormData();
            formData.append("title", form.titleTask.value);
            formData.append("description", form.descriptionTask.value);
            formData.append("deadline", form.fechaHora.value);
            formData.append("reminder", form.reminder.value);
            formData.append("priority", form.priority.value);
            formData.append("completed", false);
            formData.append("color", form.colorTarea.value);

            // Manejo de imagenes
            if (form.imagen && form.imagen.files.length > 0) {
                formData.append("imagen", form.imagen.files[0]);
            } 
            
            formData.append("subtasks", JSON.stringify(subtasks));
            
            let res = await fetch("http://localhost:3000/task", {
                method: "POST",
                credentials: "include",
                body: formData
            });
            
            let data = await res.json()
            if(!res.ok)  throw {status: res.status, message: res.statusText, dir:res}

            // alert("Tarea creada con exito")
            

        } catch (error) {
            let message = error.statusText || "Se ha producido un error"
            let status = error.status || "404"
            console.log(`Error ${status}: ${message}`)
            
        }
    },
    editTask: async (form)=>{
        try {
            let idTask = form.id.value
            if (!idTask) throw { status: 400, message: "El ID de la tarea es obligatorio" }
            
            // determinar el estado de la tarea (completed or uncompleted)
            let taskStatus = await fetch(`http://localhost:3000/task/${idTask}`, {
                method: "GET",
                credentials: "include"
            })
            if(!taskStatus.ok) throw {status: taskStatus.status, message: taskStatus.statusText}
            let dataStatus = await taskStatus.json()
            console.log(dataStatus);
            let isCompleted  = dataStatus.complete === 1? true:false;

            let formData = new FormData(); // tu formulario con inputs
            formData.append("title", form.titleTask.value)
            formData.append("description", form.descriptionTask.value)
            formData.append("priority", form.priority.value)
            formData.append("deadline", form.fechaHora.value)
            formData.append("color",form.colorTarea.value)
            formData.append("reminder", form.reminder.value)
            formData.append("completed",isCompleted.toString())

            // ingreso de subtareas
            let subtasks = []
            let subtaskItem = form.querySelectorAll(".subtask-item")
            subtaskItem.forEach(sub => {
                // let subtaskId = sub.dataset.id || null;
                let subtaskId = sub.getAttribute("data-id");
                subtaskId = subtaskId ? parseInt(subtaskId) : null;
                let title = sub.querySelector(".subtask-input").value.trim();
                let complete = sub.querySelector(".subtaskCheckbox").checked;
                if (title !== "") {
                    subtasks.push({ id: subtaskId, title, complete });
                }
            });

            formData.append("subtasks", JSON.stringify(subtasks));

            if (form.imagen && form.imagen.files.length > 0) {
                formData.append("imagen", form.imagen.files[0]);
            } else {
                formData.append("imagen", form.imagen.dataset.imagen); // <-- clave
            }
            let res = await fetch(`http://localhost:3000/edit/${idTask}`, {
                method: "PUT",
                credentials: "include",
                body: formData 
            })

            if(!res.ok) throw {status: res.status, message: res.statusText, dir:res}
        } catch (error) {
            console.log(error);
            console.log(error.dir);
            alert("sucede en el catch")
            
            let message = error.statusText || "Se ha producido un error"
            let status = error.status
            console.log(`Error ${status}: ${message}`)
        }
    },
    deleteTask: async (form)=>{
        try {
            let idTask = form.id.value

            let res = await fetch(`http://localhost:3000/delete/${idTask}`, {
                method:"DELETE",
                credentials: "include"
            })

            let data = res.json()
            if(!res.ok) throw {status: res.status, message: res.statusText}
        } catch (error) {
            let message = error.message || "Ha ocurrido un error en la eliminación"
            console.log(`Error ${error.status}: ${message}`);
        }
    },
    editChecked: async (idTask, statusChecked)=>{
        try {
            let res = await fetch(`http://localhost:3000/complete/${idTask}`, {
                method: "PATCH",
                credentials: "include",
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({
                    completed:statusChecked,
                })
            })  
            if(!res.ok) throw {status: res.status, message: res.statusText}
            
            
        } catch (error) {
            let message = error.message || "Ha ocurrido un error en la eliminación"
            console.log(`Error ${error.status}: ${message}`);
        }
    },
    progressTasks: async ()=>{
        try {
            let res = await fetch("http://localhost:3000/progress", {
                method: "GET",
                credentials: "include"
              })

            if(!res.ok) throw {status: res.status, message: res.statusText}

            let data = await res.json()
            let infoTask = {
                totalTask: data[0].totalTask,
                totalComplete: data[0].complete
            }
            return infoTask
        } catch (error) {
            let message = error.message || "Ha ocurrido un error en la eliminación"
            console.log(`Error ${error.status}: ${message}`);
        }
    },
    welcomeUser: async (options)=>{
        try {
            let res = await fetch("http://localhost:3000/user", {
                method: "GET",
                credentials: "include"
              })
            if(!res.ok) throw {status: res.status, message:res.statusText}
            let data = await res.json()

            // busqueda de informacion
            let usuario = data.user.name
            let nombreUsuario = usuario.split(" ")[0]
            // Mensaje de bienvenida
            // options.welcomeUser.textContent = `Bienvenido, ${nombreUsuario}.`

            // nombre de usuario en slider
            options.nombreDeUsuarioSidebar.textContent = `${usuario}`
            
            // correo de usuario en slider
            // options.emailUser.textContent = `${data.user.email}`

            
        } catch (error) {
            let message = error.message || "Ha ocurrido un error en la captura del nombre de usuario"
            console.log(`Error ${error.status}: ${message}`);
        }
    },
    usernameTitle: async (tituloDelContenedor)=>{
        try {
            let res = await fetch("http://localhost:3000/user", {
                method: "GET",
                credentials: "include"
              })
            if(!res.ok) throw {status: res.status, message:res.statusText}
            let data = await res.json()
            
            // busqueda de informacion
            let usuario = data.user.name
            let nombreUsuario = usuario.split(" ")[0]
            // Mensaje de bienvenida
            tituloDelContenedor.textContent = `Bienvenido, ${nombreUsuario}.`
            

            
        } catch (error) {
            let message = error.message || "Ha ocurrido un error en la captura del nombre de usuario"
            console.log(`Error ${error.status}: ${message}`);
        }
    },
    completeSubtaskChecked: async(container, idSubtask, checked)=>{
        try {
            let res = await fetch(`http://localhost:3000/subtask/${idSubtask}`, {
                method: "PATCH",
                credentials: "include",
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({
                    complete:checked,
                })
            })
            if(!res.ok) throw {status: res.status, message: res.statusText}
        } catch (error) {
            
        }
    },
    viewCalendarMonth:async (fecha, contenedorCalendario)=>{
        try {
            // Peticion
            let res = await fetch("http://localhost:3000/tasks",{
                method: "GET",
                credentials: "include"
            })
            // convertir datos del backend en formato que se usa en js
            let data = await res.json()
            if(!res.ok){
                throw {status: res.status, message: res.statusText, dir:res}
            }
            // vista de calendario mes
            calendario(contenedorCalendario, fecha, data);

        } catch (error) {
            let message = error.statusText || "Se ha producido un error"
            let status = error.status || "404"
            contenedorCalendario.innerHTML = 
            `<h3>Error ${status}: ${message} </h3>
            <br>
            <p> No se encontro el contenido solicitado  </p>
            `
        }
    },
    viewCalendarWeek:async (fecha, contenedorCalendario)=>{
        try {
            // Peticion
            let res = await fetch("http://localhost:3000/tasks",{
                method: "GET",
                credentials: "include"
            })
            // convertir datos del backend en formato que se usa en js
            let data = await res.json()
            
            if(!res.ok){
                throw {status: res.status, message: res.statusText, dir:res}
            }
            // console.log(data);

            // vista de calendario semana
            calendarioPorSemana(contenedorCalendario, fecha, data)

        } catch (error) {
            let message = error.statusText || "Se ha producido un error"
            let status = error.status || "404"
            contenedorCalendario.innerHTML = 
            `<h3>Error ${status}: ${message} </h3>
            <br>
            <p> No se encontro el contenido solicitado  </p>
            `
        }
    },
    taskForWeek:async (fecha, contenedorCalendario, svg)=>{
        try {
            // Peticion
            let res = await fetch("http://localhost:3000/tasks",{
                method: "GET",
                credentials: "include"
            })
            // convertir datos del backend en formato que se usa en js
            let data = await res.json()
            
            if(!res.ok){
                throw {status: res.status, message: res.statusText, dir:res}
            }
            // console.log(data);
            // vista de calendario semana
            tareasPorDiaSemana(contenedorCalendario, fecha, data, svg)

        } catch (error) {
            let message = error.statusText || "Se ha producido un error"
            let status = error.status || "404"
            contenedorCalendario.innerHTML = 
            `<h3>Error ${status}: ${message} </h3>
            <br>
            <p> No se encontro el contenido solicitado  </p>
            `
        }
    }

}

export default aTask;