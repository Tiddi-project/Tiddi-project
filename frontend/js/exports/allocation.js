const d = document

export default function allocation(form){

    d.addEventListener("click", async (e)=>{
        if(e.target.matches(".edit")){
            // insertar valores en los inputs
            // form.querySelector("legend").textContent = "Editar Tarea"
            form.querySelector(".add").textContent = "Editar"
            let valor = e.target.dataset
            form.titleTask.value = valor.title
            form.descriptionTask.value = valor.description
            form.priority.value = valor.priority
            form.id.value = valor.id
            form.classList.add("isActive")


            // subtareas
            let subtask = valor.subtask
            subtask = JSON.parse(subtask)
            const subtaskContainer = form.querySelector(".subtask__container")
            const subtaskItems = subtaskContainer.querySelectorAll(".subtask-item");
            subtaskItems.forEach(item => item.remove());
            

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