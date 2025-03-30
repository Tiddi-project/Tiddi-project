const d = document

export default function allocation(form){

    d.addEventListener("click", (e)=>{
        if(e.target.matches(".edit")){
            // insertar valores en los inputs
            form.querySelector("legend").textContent = "Editar Tarea"
            form.querySelector(".add").textContent = "Editar"
            let value = e.target.dataset
            form.titleTask.value = value.title
            form.descriptionTask.value = value.description
            form.priority.value = value.priority
            form.id.value = value.id
            form.classList.add("isActive")
        }
    })
}