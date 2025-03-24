const d = document

export default function allocation(form){

    d.addEventListener("click", (e)=>{
        if(e.target.matches(".edit")){
            // insertar valores en los inputs
            let value = e.target.dataset
            form.titleTask.value = value.title
            form.descriptionTask.value = value.description
            form.id.value = value.id

            form.classList.add("isActive")
        }

    })
}