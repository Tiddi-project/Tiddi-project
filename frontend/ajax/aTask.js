
const aTask = {
    getAll: async (option)=>{
        try {
            let res = await fetch("http://localhost:3000/tasks",{
                method: "GET",
                credentials: "include"
            })
            let data = await res.json()
            
            if(!res.ok){
                throw {status: res.status, message: res.statusText, dir:res}
            }
            
            if(data.length === 0){
                option.$taskList.innerHTML = `
                    <h2>No tienes tareas por realizar</h2>
                `
                
            }
            data.forEach((task, index) => {
                // checkbox
                option.$template.querySelector(".checkbox").dataset.id = task.id
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

                // insertando data-attribute
                option.$template.querySelector(".edit").dataset.id = task.id
                option.$template.querySelector(".edit").dataset.title = task.title
                option.$template.querySelector(".edit").dataset.description = task.description

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
            let res = await fetch("http://localhost:3000/task", {
                method: "POST",
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({
                    title: form.titleTask.value,
                    description: form.descriptionTask.value,
                    completed: false
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

            let taskStatus = await fetch(`http://localhost:3000/task/${idTask}`)
            if(!taskStatus.ok) throw {status: res.status, message: res.statusText}
            let dataStatus = await taskStatus.json()
            let isCompleted  = dataStatus.completed
            
           
            let res = await fetch(`http://localhost:3000/edit/${idTask}`, {
                method: "PUT",
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({
                    title: form.titleTask.value,
                    description: form.descriptionTask.value,
                    completed:isCompleted,
                })
            })

            if(!res.ok) throw {status: res.status, message: res.statusText, dir:res}
            alert("Tarea editada con exito")
        } catch (error) {
            let message = error.statusText || "Se ha producido un error"
            let status = error.status
            console.log(`Error ${status}: ${message}`)
        }
    },
    deleteTask: async (form)=>{
        try {
            let idTask = form.id.value

            let res = await fetch(`http://localhost:3000/delete/${idTask}`, {
                method:"DELETE"
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
                headers: {"content-type": "application/json; charset= utf-8"},
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
            let res = await fetch("http://localhost:3000/progress")

            if(!res.ok) throw {status: res.status, message: res.statusText}

            let data = await res.json()
            console.log(data[0]);
            console.log(data[0].totalTask);
            console.log(data[0].complete);
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
            let res = await fetch("http://localhost:3000/user")
            if(!res.ok) throw {status: res.status, message:res.statusText}
            let data = await res.json()
            console.log(data);
            // busqueda de informacion
            let usuario = data.user.name
            let nombreUsuario = usuario.split(" ")[0]

            // Mensaje de bienvenida
            options.welcomeUser.textContent = `Bienvenido, ${nombreUsuario}.`

            // nombre de usuario en slider
            options.nameUser.textContent = `${usuario}`
            
            // nombre de usuario en slider
            options.emailUser.textContent = `${data.user.email}`

            console.log(nombreUsuario);
            
        } catch (error) {
            let message = error.message || "Ha ocurrido un error en la captura del nombre de usuario"
            console.log(`Error ${error.status}: ${message}`);
        }
    }

}

export default aTask;