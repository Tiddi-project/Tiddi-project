import circleProgress from "../js/exports/circleProgress.js";

const aTask = {
    getAll: async (option)=>{
        try {
            // Peticion
            let res = await fetch("http://localhost:3000/tasks",{
                method: "GET",
                credentials: "include"
            })
            // convertir datos del backend en formato que se usa en js
            let data = await res.json()
            console.log(data);
            if(!res.ok){
                throw {status: res.status, message: res.statusText, dir:res}
            }
            // Restriccion en caso de no haber tareas relacionadas con el usuario
            if(data.length === 0){
                option.$taskList.innerHTML = `<h2>No tienes tareas por realizar</h2>`
            }
            // Recorrido de las tareas y asignacion en el template
            data.forEach((task, index) => {
                // checkbox
                option.$template.querySelector(".checkbox").dataset.id = task.task_id
                option.$template.querySelector(".checkbox").setAttribute("id", index)
                option.$template.querySelector(".newCheckbox").setAttribute("for", index)
                option.$template.querySelector(".task").setAttribute("for", index)
                
                if(task.complete === 1){
                    option.$template.querySelector(".task").classList.add("completed")
                    option.$template.querySelector(".checkbox").checked = true
                }else{
                    option.$template.querySelector(".task").classList.remove("completed")
                    option.$template.querySelector(".checkbox").checked = false

                }

                // insertando valores de la API en contenedor de tarea
                option.$template.querySelector(".title").textContent = task.title
                option.$template.querySelector(".description").textContent = task.description
                
                // subtask
                let subtaskList = option.$template.querySelector(".subtask-list");
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
                // insertando data-attribute
                option.$template.querySelector(".edit").dataset.id = task.task_id
                option.$template.querySelector(".edit").dataset.title = task.title
                option.$template.querySelector(".edit").dataset.description = task.description
                option.$template.querySelector(".edit").dataset.priority = task.priority
                option.$template.querySelector(".edit").dataset.subtask = JSON.stringify(task.subtasks)

                // uniendo el formato
                let clone = document.importNode(option.$template, true)
                option.$fragment.appendChild(clone)
            });
            option.$taskList.appendChild(option.$fragment)

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

            let res = await fetch("http://localhost:3000/task", {
                method: "POST",
                credentials: "include",
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({
                    title: form.titleTask.value,
                    description: form.descriptionTask.value,
                    priority: form.priority.value,
                    completed: false,
                    subtasks
                })
            })
            
            let data = await res.json()
            if(!res.ok)  throw {status: res.status, message: res.statusText, dir:res}

            alert("Tarea creada con exito")

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
            let isCompleted  = dataStatus.completed
            
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

            console.log(subtasks);
           
            let res = await fetch(`http://localhost:3000/edit/${idTask}`, {
                method: "PUT",
                credentials: "include",
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({
                    title: form.titleTask.value,
                    description: form.descriptionTask.value,
                    completed:isCompleted,
                    priority:form.priority.value,
                    subtasks
                })
            })
            
            //  ver la respuesta del servidor
            let responseText = await res.text();
            console.log("Respuesta del servidor:", responseText);
            
            if(!res.ok) throw {status: res.status, message: res.statusText, dir:res}
            alert("Tarea editada con exito")
        } catch (error) {
            console.log(error);
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
    editChecked: async (taskContainer, idTask, statusChecked)=>{
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
            // console.log(data);
            // busqueda de informacion
            let usuario = data.user.name
            let nombreUsuario = usuario.split(" ")[0]

            // Mensaje de bienvenida
            options.welcomeUser.textContent = `Bienvenido, ${nombreUsuario}.`

            // nombre de usuario en slider
            options.nameUser.textContent = `${usuario}`
            
            // nombre de usuario en slider
            options.emailUser.textContent = `${data.user.email}`

            // console.log(nombreUsuario);
            
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
    }

}

export default aTask;