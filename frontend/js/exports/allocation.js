// Funcion creada para la asignacion del los valores del formulario para su edicion
const d = document

export default function allocation(form){

    d.addEventListener("click", async (e)=>{
        if(e.target.matches(".edit")){
            // insertar valores en los inputs
            form.querySelector(".add").textContent = "Editar"
            let valor = e.target.dataset
            form.titleTask.value = valor.title
            form.descriptionTask.value = valor.description
            form.priority.value = valor.priority
            form.colorTarea.value = valor.colorTarea
            form.reminder.value = valor.reminder
            form.id.value = valor.id
            let imagen = valor.imagen;
            if (imagen) {
                form.querySelector(".imagen-insertada").src = `/uploads/${imagen}`
                form.querySelector(".imagen").dataset.imagen = imagen
                form.querySelector(".imagen-insertada").style.display = "block";
                form.querySelector(".btn-eliminar-imagen").style.display = "block";
            }else{
                form.querySelector(".imagen").dataset.imagen = ""
                form.querySelector(".imagen-insertada").style.display = "none";
                form.querySelector(".btn-eliminar-imagen").style.display = "none";
            }

            // convierte la fecha a formato aceptado
            /*
            console.log("Valor de la base de dato", valor.deadline);
            const fecha = new Date(valor.deadline);
            const fechaLocal = fecha.toISOString().slice(0, 16);
            console.log("Valor añadido despues de formato ", fechaLocal);
            */
           // form.fechaHora.value = valor.deadline
            form.fechaHora.value = valor.deadline;
            form.classList.add("isActive")

            // subtareas
            let subtask = valor.subtask
            subtask = JSON.parse(subtask)
            const subtaskContainer = form.querySelector(".subtask__container")

            // Limpiar subtareas anteriores
            const subtaskItems = subtaskContainer.querySelectorAll(".subtask-item");
            subtaskItems.forEach(item => item.remove());
            
            // Mostrar u ocultar contenedor según si hay subtareas
            // if (!subtask || subtask.length === 0) {
            //     subtaskContainer.style.display = "none";
            // } else{
            // }

            subtaskContainer.style.display = "block";
            subtask.forEach(sub => {
                const subtaskCreate = d.createElement("div")
                subtaskCreate.classList.add("subtask-item")

                // ID para la base de datos (si existe)
                if (sub.id) subtaskCreate.dataset.id = sub.id;
                
                // ID único para el checkbox (esto solo es visual)
                const checkboxId = `subtask-checkbox-${sub.id || Math.random().toString(36).substr(2, 9)}`;


                subtaskCreate.innerHTML = `
                    <input type="checkbox" name="subtaskCheckbox" class="subtaskCheckbox" id="${checkboxId}" ${sub.complete ? "checked" : ""}>
                    <label for="${checkboxId}"></label>
                    <input type="text" name="subtasks[]" class="subtask-input" placeholder="Subtarea" value="${sub.title}" required>
                    <button type="button" class="remove-subtask">&#8722</button>
                `;
                subtaskContainer.append(subtaskCreate)

            });
            

        }
    })
}